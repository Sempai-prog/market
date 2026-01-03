import Link from "next/link";
import { Sparkles, Radio, FileCheck, ArrowRight, BrainCircuit, ShieldCheck, TrendingUp } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-white selection:bg-amber-100 selection:text-amber-900">
      
      {/* Navigation Spécifique Landing */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-900/10">
              <BrainCircuit size={24} className="text-amber-400" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              TenderHub <span className="text-blue-700">Africa</span>
            </span>
          </div>
          <div className="flex gap-4 items-center">
            <Link href="/login" className="hidden md:block text-slate-600 font-medium hover:text-blue-700 transition">
              Se connecter
            </Link>
            <Link 
              href="/register" 
              className="bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold hover:bg-blue-800 transition shadow-lg shadow-blue-700/20 flex items-center gap-2"
            >
              Essai Gratuit
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
        {/* Elements d'arrière plan "Luxe" */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/3 w-[800px] h-[800px] bg-gradient-to-br from-blue-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-gradient-to-tr from-amber-50 to-transparent rounded-full blur-3xl opacity-60 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-sm font-medium mb-8 animate-fade-in-up shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
            <span>Moteur IA v2.0 disponible</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 tracking-tight mb-8 leading-[1.1]">
            L'Intelligence Artificielle <br />
            au service des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-blue-500">Marchés Publics</span>
          </h1>
          
          <p className="mt-4 max-w-2xl mx-auto text-xl text-slate-500 leading-relaxed font-light">
            Détectez, analysez et remportez des appels d'offres en Afrique de l'Ouest et Centrale. Une technologie de pointe pour les PME ambitieuses.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-5">
            <Link 
              href="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-slate-900 rounded-xl hover:bg-slate-800 shadow-xl shadow-slate-900/20 transition-all hover:-translate-y-1"
            >
              Commencer l'essai gratuit
            </Link>
            <Link 
              href="/demo" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
            >
              Voir la démo interactive
            </Link>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-20 pt-10 border-t border-slate-100">
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-6">
              Données agrégées depuis les sources officielles
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="text-xl font-black text-slate-800">ARMP</span>
              <span className="text-xl font-black text-slate-800">DGMP</span>
              <span className="text-xl font-black text-slate-800">BAD</span>
              <span className="text-xl font-black text-slate-800">BOAD</span>
              <span className="text-xl font-black text-slate-800">WORLDBANK</span>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Une suite d'outils d'excellence</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Nous avons simplifié le processus de réponse aux appels d'offres pour vous permettre de vous concentrer sur votre expertise.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300 group">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <BrainCircuit className="text-blue-700" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Analyse IA</h3>
              <p className="text-slate-600 leading-relaxed">
                Notre algorithme lit les Dossiers d'Appels d'Offres (DAO) en quelques secondes pour extraire les critères d'éligibilité, les risques et les pièces requises.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-amber-900/5 transition-all duration-300 group">
              <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Radio className="text-amber-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Veille Temps Réel</h3>
              <p className="text-slate-600 leading-relaxed">
                Ne ratez aucune opportunité. Paramétrez vos alertes par secteur et zone géographique et recevez les notifications avant vos concurrents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-green-900/5 transition-all duration-300 group">
              <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <FileCheck className="text-green-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Assistance Candidature</h3>
              <p className="text-slate-600 leading-relaxed">
                Générez vos lettres de soumission, vérifiez la conformité de vos pièces administratives et assemblez votre dossier sans erreur.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-slate-900 rounded-[2.5rem] p-12 md:p-20 text-center relative overflow-hidden">
            {/* Abstract Shapes */}
            <div className="absolute top-0 left-0 w-full h-full">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
               <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Prêt à transformer votre taux de succès ?</h2>
              <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
                Rejoignez la nouvelle génération d'entreprises africaines qui utilisent la technologie pour gagner.
              </p>
              <Link 
                href="/register" 
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-slate-900 bg-white rounded-xl hover:bg-slate-100 transition-colors shadow-2xl"
              >
                Créer un compte gratuitement
                <ArrowRight className="ml-2" />
              </Link>
              <p className="mt-6 text-sm text-slate-500">
                Aucune carte bancaire requise pour l'essai.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-slate-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
              <BrainCircuit size={18} className="text-amber-400" />
            </div>
            <span className="font-bold text-lg text-slate-900">TenderHub Africa</span>
          </div>
          <p className="text-slate-500 text-sm">
            © 2024 TenderHub Africa. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm font-medium text-slate-600">
            <Link href="#" className="hover:text-blue-700 transition">Confidentialité</Link>
            <Link href="#" className="hover:text-blue-700 transition">CGU</Link>
            <Link href="#" className="hover:text-blue-700 transition">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
