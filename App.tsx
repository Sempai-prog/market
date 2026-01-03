import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { TenderCard } from './components/TenderCard';
import { TenderDetail } from './components/TenderDetail';
import { Tender, ViewState, Country } from './types';
import { MOCK_TENDERS } from './data/mock';
import { Search, Filter, SlidersHorizontal, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { AuthProvider, useAuth } from './context/AuthContext';

// Composant interne pour utiliser le hook useAuth
const AppContent: React.FC = () => {
  const [view, setView] = useState<ViewState>('LIST');
  const [selectedTenderId, setSelectedTenderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | 'ALL'>('ALL');
  
  const { user, login, logout } = useAuth();

  // Filter Logic
  const filteredTenders = useMemo(() => {
    return MOCK_TENDERS.filter(tender => {
      const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tender.authority.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === 'ALL' || tender.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

  // Navigation Handlers
  const handleTenderClick = (tender: Tender) => {
    setSelectedTenderId(tender.id);
    setView('DETAIL');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setSelectedTenderId(null);
    setView('LIST');
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 pb-20 md:pb-0 font-sans">
      {view === 'LIST' && (
        <>
            {/* Custom Header for Demo with Auth Toggle */}
            <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
                    <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
                        Afritenders<span className="text-blue-600">Pro</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-3 bg-gray-50 py-1.5 px-3 rounded-full border border-gray-200">
                             <div className="flex flex-col items-end hidden sm:flex">
                                <span className="text-xs font-bold text-gray-900">{user.companyName}</span>
                                <span className="text-[10px] text-green-600 uppercase tracking-wider">Connecté</span>
                             </div>
                             <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center">
                                <UserIcon size={16} />
                             </div>
                             <button onClick={logout} className="text-gray-400 hover:text-red-500 ml-1" title="Déconnexion">
                                <LogOut size={16} />
                             </button>
                        </div>
                    ) : (
                        <button 
                            onClick={() => login({
                                id: 'demo-user',
                                name: 'Demo User',
                                companyName: 'BTP Solutions Demo',
                                email: 'demo@example.com',
                                isAuthenticated: true
                            })}
                            className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-lg transition"
                        >
                            <LogIn size={18} />
                            <span className="hidden sm:inline">Simulation Connexion</span>
                        </button>
                    )}
                  </div>
                </div>
              </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Hero / Search Section */}
            <div className="mb-8 space-y-4">
                <h1 className="text-2xl font-bold text-gray-900">Marchés Publics & Appels d'Offres</h1>
                <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="text-gray-400" size={20} />
                    </div>
                    <input
                    type="text"
                    placeholder="Mots-clés (ex: Route, Logiciel, BTP...)"
                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
                    <select 
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value as Country | 'ALL')}
                        className="block w-40 pl-3 pr-8 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white shadow-sm cursor-pointer"
                    >
                        <option value="ALL">Tous les pays</option>
                        {Object.values(Country).map(c => (
                            <option key={c} value={c}>{c}</option>
                        ))}
                    </select>
                    <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition">
                        <SlidersHorizontal size={18} className="mr-2" />
                        Filtres
                    </button>
                </div>
                </div>
            </div>

            {/* Results Grid */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {filteredTenders.map(tender => (
                <TenderCard 
                    key={tender.id} 
                    tender={tender} 
                    onClick={handleTenderClick} 
                />
                ))}
                
                {filteredTenders.length === 0 && (
                    <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
                            <Filter className="text-gray-400" size={32} />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">Aucun résultat</h3>
                        <p className="mt-1 text-gray-500">Essayez d'élargir vos critères de recherche.</p>
                    </div>
                )}
            </div>
            </main>
        </>
      )}

      {view === 'DETAIL' && selectedTenderId && (
        <TenderDetail tenderId={selectedTenderId} onBack={handleBack} />
      )}

      {/* Footer Legal */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs text-gray-500 mb-2">
                Conformité Loi n° 2024/017 relative aux marchés publics (Cameroun) et standards RGPD.
            </p>
            <p className="text-xs text-gray-400">
                &copy; 2024 Afritenders Pro. Une technologie "Ultrathink".
            </p>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;