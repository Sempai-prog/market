import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Tentative de récupération de session au chargement (Hydration)
  useEffect(() => {
    try {
      const stored = localStorage.getItem('afritenders_user');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Erreur parsing user storage", e);
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('afritenders_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('afritenders_user');
    // Force reload pour nettoyer les états en mémoire ou redirection via router dans le composant
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
