import { NextRequest, NextResponse } from 'next/server';
import { LoginSchema } from '@/lib/validators'; // Assume alias @/ points to root
import { verifyPassword, signAccessToken, signRefreshToken } from '@/lib/auth';
import { z } from 'zod';

// Note: Dans un environnement réel, on importerait le client DB ici.
// import { db } from '@/lib/db'; 

export async function POST(request: NextRequest) {
  try {
    // 1. Parsing & Validation du Body
    const body = await request.json();
    const { email, password } = LoginSchema.parse(body);

    // 2. Recherche utilisateur (Simulation DB)
    // const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    
    // Simulation pour la démo : On accepte "jean.dupont@btp-solutions.af"
    const MOCK_USER_DB = {
      id: 'usr_123456',
      email: 'jean.dupont@btp-solutions.af',
      // Hash de "Password123" généré via bcrypt
      password_hash: '$2a$12$eX0.p/v.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X.X', 
      company_name: 'BTP Solutions Afrique',
      is_verified: true
    };

    if (email !== MOCK_USER_DB.email) {
      // Pour la sécurité, on utilise un message générique
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 3. Vérification du mot de passe
    // En prod : const isValid = await verifyPassword(password, user.password_hash);
    const isValid = true; // Mock: on assume que le mot de passe est bon pour la démo si l'email match

    if (!isValid) {
      return NextResponse.json(
        { error: "Identifiants invalides" },
        { status: 401 }
      );
    }

    // 4. Génération des Tokens
    const accessToken = await signAccessToken({ userId: MOCK_USER_DB.id });
    const refreshToken = await signRefreshToken({ userId: MOCK_USER_DB.id });

    // 5. Préparation de la réponse
    const response = NextResponse.json({
      user: {
        id: MOCK_USER_DB.id,
        email: MOCK_USER_DB.email,
        companyName: MOCK_USER_DB.company_name,
        isAuthenticated: true
      }
    });

    // 6. Injection des Cookies Sécurisés (HTTP-Only)
    // Access Token
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: 15 * 60 // 15 minutes
    });

    // Refresh Token
    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/api/auth/refresh', // Envoyé uniquement au endpoint de refresh
      maxAge: 7 * 24 * 60 * 60 // 7 jours
    });

    return response;

  } catch (error) {
    console.error('Login Error:', error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}