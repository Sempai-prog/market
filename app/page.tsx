import Link from "next/link";
import { Sparkles, Radio, FileCheck, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans">
      
      {/* Navigation Rapide (Header simplifié pour la Landing) */}
      <nav className="absolute top-0 w-full z-50 px-6 py-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-blue-900/20">A</div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Afritenders<span className="text-blue-700">Pro</span>
            </span>
          </div>
          <div className="hidden md:flex gap-6 items-center">
            <Link href="/login" className="text-slate-600 font-medium hover:text-blue-700 transition">Connexion</Link>
            <Link 
              href="/register" 
              className="bg-slate-900 text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-slate-800 transition shadow-md"
            >
              Créer un compte
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION : Afro-Luxe (Blanc / Bleu Roi / Or) */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-800 text-sm font-semibold mb-8 animate-fade-in-up">
            <Sparkles size={16} className="text-amber-500" />
            <span>Nouvelle Version : Moteur IA Gemini 3.0 intégré</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            L'Intelligence Artificielle <br className="hidden md:block" />
            au service des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Marchés Publics</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed">
            Détectez, analysez et gagnez des appels d'offres au Cameroun, Sénégal et Côte d'Ivoire grâce à notre technologie de veille stratégique.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-blue-700 rounded-xl hover:bg-blue-800 shadow-xl shadow-blue-900/10 transition-transform active:scale-95"
            >
              Commencer l'essai gratuit
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/demo" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              Voir la démo
            </Link>
          </div>

          <div className="mt-12 flex justify-center items-center gap-8 text-slate-400 grayscale opacity-70">
            {/* Logos partenaires simulés */}
            <span className="font-bold text-lg">ARMP</span>
            <span className="font-bold text-lg">BAD</span>
            <span className="font-bold text-lg">BOAD</span>
            <span className="font-bold text-lg">SFI</span>
          </div>
        </div>
      </section>

      {/* FEATURES GRID */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Pourquoi choisir Afritenders Pro ?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Une suite d'outils conçue spécifiquement pour les PME africaines ambitieuses.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                <Sparkles className="text-amber-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Analyse IA Avancée</h3>
              <p className="text-slate-600 leading-relaxed">
                Ne perdez plus de temps à lire 50 pages. Notre IA résume les dossiers, identifie les risques et liste les pièces requises en 3 secondes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                <Radio className="text-blue-700" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Veille Temps Réel</h3>
              <p className="text-slate-600 leading-relaxed">
                Connecté aux portails officiels (ARMP, DGMP). Recevez une notification WhatsApp dès qu'un marché correspondant à votre profil est publié.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-green-100 transition-colors">
                <FileCheck className="text-green-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Assistance Candidature</h3>
              <p className="text-slate-600 leading-relaxed">
                Générez automatiquement vos lettres de soumission et vérifiez la conformité de votre dossier administratif avant envoi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST / REGION SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
           <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-blue-700 font-bold uppercase tracking-wider text-sm">
                <Globe size={16} />
                <span>Couverture Régionale</span>
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                L'Afrique de l'Ouest et Centrale <br />
                <span className="text-amber-500">à portée de clic.</span>
              </h2>
              <p className="text-lg text-slate-600">
                Nous agrégeons les données de plus de 15 sources officielles pour vous offrir une vision à 360° des opportunités d'affaires.
              </p>
              <ul className="space-y-3">
                {['Cameroun (DGMP/ARMP)', 'Côte d\'Ivoire', 'Sénégal', 'Bénin', 'RDC'].map((country) => (
                  <li key={country} className="flex items-center gap-3 text-slate-700 font-medium">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    {country}
                  </li>
                ))}
              </ul>
           </div>
           <div className="flex-1 relative">
              {/* Abstract Map Representation */}
              <div className="aspect-square rounded-full bg-gradient-to-tr from-slate-100 to-blue-50 relative flex items-center justify-center">
                 <div className="text-slate-200 text-9xl font-black select-none">AFRICA</div>
                 
                 {/* Floating Cards */}
                 <div className="absolute top-1/4 -left-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-bounce delay-100">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                          <ShieldCheck size={20} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-500">Nouveau Marché</p>
                          <p className="font-bold text-slate-900">Route Bafoussam</p>
                       </div>
                    </div>
                 </div>

                 <div className="absolute bottom-1/4 -right-4 bg-white p-4 rounded-xl shadow-lg border border-slate-100 animate-bounce delay-700">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                          <Sparkles size={20} />
                       </div>
                       <div>
                          <p className="text-xs text-slate-500">Opportunité IT</p>
                          <p className="font-bold text-slate-900">Data Center Dakar</p>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">A</div>
              <span className="font-bold text-xl tracking-tight text-white">
                Afritenders<span className="text-blue-500">Pro</span>
              </span>
            </div>
            <p className="text-slate-400 max-w-sm mb-6">
              La plateforme de référence pour l'intelligence économique et l'accès aux marchés publics en zone OHADA.
            </p>
            <p className="text-xs text-slate-500">
              © 2024 Afritenders Pro. Tous droits réservés.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-4">Plateforme</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/pricing" className="hover:text-white transition">Tarifs</Link></li>
              <li><Link href="/features" className="hover:text-white transition">Fonctionnalités</Link></li>
              <li><Link href="/enterprise" className="hover:text-white transition">Entreprise</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Légal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/legal/terms" className="hover:text-white transition">CGU / CGV</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-white transition">Politique de Confidentialité</Link></li>
              <li><Link href="/legal/compliance" className="hover:text-white transition">Conformité Loi 2024/017</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
