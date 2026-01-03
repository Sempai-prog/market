import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row">
      {/* Côté Gauche : Formulaire */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 py-12 relative">
        <div className="absolute top-6 left-6">
            <Link href="/" className="flex items-center text-gray-500 hover:text-blue-700 transition gap-2 text-sm font-medium">
                <ArrowLeft size={16} />
                Retour à l'accueil
            </Link>
        </div>
        
        <div className="mx-auto w-full max-w-sm lg:w-96">
            {children}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
            &copy; 2024 Afritenders Pro. Sécurisé par chiffrement bancaire.
        </div>
      </div>

      {/* Côté Droit : Visuel "Inspirant" (Desktop uniquement) */}
      <div className="hidden md:flex flex-1 relative bg-slate-900 text-white overflow-hidden">
        {/* Background abstrait */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600 rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500 rounded-full blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>

        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
                Gagnez vos marchés publics avec <span className="text-blue-400">assurance</span>.
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-md">
                Rejoignez plus de 2,500 entreprises africaines qui utilisent notre IA pour analyser les risques et maximiser leurs chances de succès.
            </p>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-2xl">🚀</div>
                    <div>
                        <p className="font-bold text-white">Analyse Rapide</p>
                        <p className="text-sm text-slate-400">Déchiffrez 50 pages en 3 secondes</p>
                    </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl border border-white/10">
                    <div className="text-2xl">⚖️</div>
                    <div>
                        <p className="font-bold text-white">Conformité Totale</p>
                        <p className="text-sm text-slate-400">Standards OHADA & RGPD</p>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
