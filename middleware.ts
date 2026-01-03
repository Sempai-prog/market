import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from './lib/auth';

// Routes nécessitant une authentification
const PROTECTED_PATHS = [
  '/dashboard',
  '/api/appels-offres', // Création/Modif (POST/PUT/DELETE) - note: le GET pourrait être public selon la logique
  '/api/candidatures'
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Initialisation de la réponse (par défaut : on continue)
  let response = NextResponse.next();

  // 2. Vérification si la route est protégée
  const isProtected = PROTECTED_PATHS.some(path => pathname.startsWith(path));

  if (isProtected) {
    const token = request.cookies.get('accessToken')?.value;
    const session = token ? await verifyAccessToken(token) : null;

    if (!session) {
      // Cas A : Requête API -> 401 Unauthorized
      if (pathname.startsWith('/api')) {
        return NextResponse.json(
          { error: "Authentification requise" },
          { status: 401 }
        );
      }
      
      // Cas B : Navigation Page -> Redirection vers Login
      // On sauvegarde l'URL d'origine pour rediriger après login
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
    
    // Si authentifié, on peut passer des infos via headers aux Server Components (optionnel)
    // response.headers.set('x-user-id', session.userId as string);
  }

  // 3. Injection des Headers de Sécurité (RFP Section B.5)
  // Ces headers sont appliqués à TOUTES les réponses passant par ce middleware
  
  // Empêche le navigateur de deviner le type de fichier (MIME-sniffing)
  response.headers.set('X-Content-Type-Options', 'nosniff');
  
  // Protection contre le Clickjacking (interdit l'affichage dans une iframe)
  response.headers.set('X-Frame-Options', 'DENY');
  
  // Contrôle des informations envoyées lors de la navigation vers un autre site
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Protection XSS (Cross-Site Scripting) de base pour les vieux navigateurs
  response.headers.set('X-XSS-Protection', '1; mode=block');

  // Force HTTPS (HSTS) - Activé uniquement en production pour éviter les soucis en localhost
  if (process.env.NODE_ENV === 'production') {
    response.headers.set(
      'Strict-Transport-Security', 
      'max-age=63072000; includeSubDomains; preload'
    );
  }

  return response;
}

// Configuration du Matcher pour optimiser les performances
// On n'exécute le middleware que sur les routes pertinentes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, fonts, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};