import React, { useState } from 'react';
import { AIAnalysisResult, Sector } from '../types';
import { useAuth } from '../context/AuthContext';
import { analyzeTender, chatWithTender } from '../services/geminiService';
import { Badge } from './Badge';
import { useTender } from '../hooks/useTender';
import { 
    ArrowLeft, Share2, Bookmark, Sparkles, AlertTriangle, 
    CheckCircle, Briefcase, Calendar, Building2, MapPin, 
    Lock, FileCheck, Send, FileText
} from 'lucide-react';

interface TenderDetailProps {
  tenderId: string;
  onBack: () => void;
}

export const TenderDetail: React.FC<TenderDetailProps> = ({ tenderId, onBack }) => {
  const { tender, loading: loadingTender, error } = useTender(tenderId);
  const { user, login } = useAuth();
  
  // États locaux
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [chatLoading, setChatLoading] = useState(false);
  const [applicationStatus, setApplicationStatus] = useState<'idle' | 'applying' | 'success'>('idle');

  // IA Logic
  const handleAnalysis = async () => {
    if (!tender) return;
    setAnalyzing(true);
    const result = await analyzeTender(tender);
    setAnalysis(result);
    setAnalyzing(false);
  };

  const handleChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || !tender) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, {role: 'user', text: userMsg}]);
    setChatInput("");
    setChatLoading(true);
    const response = await chatWithTender([], userMsg, tender.fullContent);
    setChatHistory(prev => [...prev, {role: 'bot', text: response || ""}]);
    setChatLoading(false);
  };

  // Application Logic
  const handleApply = () => {
    if (applicationStatus !== 'idle') return;
    setApplicationStatus('applying');
    // Simulation envoi dossier
    setTimeout(() => {
        setApplicationStatus('success');
    }, 1500);
  };

  // --- RENDERING : LOADING STATE ---
  if (loadingTender) {
    return (
        <div className="bg-white min-h-screen p-6 animate-pulse">
            <div className="h-6 w-24 bg-gray-200 rounded mb-6"></div>
            <div className="h-8 w-3/4 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-12"></div>
            <div className="space-y-4">
                <div className="h-32 bg-gray-100 rounded-xl"></div>
                <div className="h-64 bg-gray-100 rounded-xl"></div>
            </div>
        </div>
    );
  }

  // --- RENDERING : ERROR STATE ---
  if (error || !tender) {
    return (
        <div className="bg-white min-h-screen flex flex-col items-center justify-center p-6 text-center">
            <div className="bg-red-50 p-4 rounded-full mb-4">
                <AlertTriangle className="text-red-500" size={32} />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Erreur de chargement</h2>
            <p className="text-gray-600 mb-6">{error || "Cet appel d'offre n'est plus disponible."}</p>
            <button onClick={onBack} className="text-blue-600 font-medium hover:underline">
                Retour à la liste
            </button>
        </div>
    );
  }

  const isUrgent = new Date(tender.deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div className="bg-white min-h-full pb-24 md:pb-0 relative">
      {/* Navbar detail */}
      <div className="sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-100 px-4 py-3 flex items-center justify-between z-40">
        <button onClick={onBack} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div className="flex gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
            <Share2 size={20} />
          </button>
          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors">
            <Bookmark size={20} />
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        
        {/* Header Section */}
        <div className="mb-8">
            <div className="flex gap-2 mb-3 flex-wrap">
                <Badge variant="outline">{tender.country}</Badge>
                <Badge variant={tender.sector === Sector.BTP ? 'warning' : 'default'}>{tender.sector}</Badge>
                {isUrgent && <Badge variant="danger">Clôture Imminente</Badge>}
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
                {tender.title}
            </h1>
            <div className="flex items-center gap-2 text-gray-600 font-medium">
                <Building2 size={18} />
                <span>{tender.authority}</span>
            </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-400 text-xs font-semibold uppercase mb-1">Budget</span>
                <span className="font-bold text-gray-900 block truncate">{tender.budget || "N/C"}</span>
            </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-400 text-xs font-semibold uppercase mb-1">Date Limite</span>
                <span className={`font-bold block truncate ${isUrgent ? 'text-red-600' : 'text-gray-900'}`}>
                    {new Date(tender.deadline).toLocaleDateString()}
                </span>
            </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-400 text-xs font-semibold uppercase mb-1">Référence</span>
                <span className="font-mono text-gray-900 text-sm block truncate">{tender.reference}</span>
            </div>
             <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <span className="block text-gray-400 text-xs font-semibold uppercase mb-1">Statut</span>
                <span className="text-green-700 bg-green-100 px-2 py-0.5 rounded text-xs font-bold inline-block">
                    OUVERT
                </span>
            </div>
        </div>

        {/* AI Analysis Card */}
        <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-2xl p-6 border border-blue-100 shadow-sm mb-10 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
                <Sparkles size={120} className="text-blue-600" />
            </div>
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white shadow-lg shadow-blue-200">
                    <Sparkles size={20} />
                </div>
                <div>
                    <h2 className="font-bold text-gray-900 text-lg">Analyse IA "Flash"</h2>
                    <p className="text-xs text-blue-600 font-medium">Propulsé par Gemini 3.0</p>
                </div>
            </div>

            {!analysis && !analyzing && (
                <div className="text-center py-6 relative z-10">
                    <p className="text-gray-600 mb-4 max-w-md mx-auto">
                        Laissez l'IA analyser les 50+ pages du dossier pour extraire les risques et documents clés en 3 secondes.
                    </p>
                    <button 
                        onClick={handleAnalysis}
                        className="bg-white text-blue-700 font-semibold py-3 px-6 rounded-xl border border-blue-200 shadow-sm hover:shadow-md hover:bg-blue-50 transition active:scale-95"
                    >
                        Lancer l'analyse intelligente
                    </button>
                </div>
            )}

            {analyzing && (
                <div className="py-8 text-center relative z-10">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-200 border-t-blue-600 mb-3"></div>
                    <p className="text-blue-800 font-medium">Lecture du dossier technique...</p>
                </div>
            )}

            {analysis && (
                <div className="space-y-5 relative z-10 animate-fade-in">
                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-blue-100">
                        <p className="text-gray-800 leading-relaxed text-sm">{analysis.summary}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className={`p-4 rounded-xl border ${analysis.riskScore > 50 ? 'bg-red-50 border-red-100' : 'bg-green-50 border-green-100'}`}>
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-xs font-bold uppercase tracking-wider ${analysis.riskScore > 50 ? 'text-red-600' : 'text-green-600'}`}>Complexité</span>
                                <AlertTriangle size={16} className={analysis.riskScore > 50 ? 'text-red-500' : 'text-green-500'} />
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{analysis.riskScore}/100</div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                                <div 
                                    className={`h-1.5 rounded-full ${analysis.riskScore > 50 ? 'bg-red-500' : 'bg-green-500'}`} 
                                    style={{ width: `${analysis.riskScore}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border border-gray-200">
                             <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-1">
                                <FileCheck size={14} /> Pré-requis
                             </h3>
                             <ul className="text-sm space-y-2">
                                {analysis.keyRequirements.map((req, i) => (
                                    <li key={i} className="flex items-start gap-2 text-gray-700">
                                        <div className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-400 flex-shrink-0"></div>
                                        <span>{req}</span>
                                    </li>
                                ))}
                             </ul>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-xl border border-yellow-100 text-yellow-900">
                        <Sparkles size={18} className="mt-0.5 text-yellow-600 flex-shrink-0" />
                        <div>
                            <span className="block font-bold text-xs uppercase text-yellow-700 mb-1">Stratégie Gagnante</span>
                            <p className="text-sm italic font-medium">"{analysis.winningStrategy}"</p>
                        </div>
                    </div>
                </div>
            )}
        </div>

        {/* Full Description */}
        <div className="prose prose-slate max-w-none text-gray-600 mb-20">
            <h3 className="text-gray-900 font-bold text-lg mb-4 flex items-center gap-2">
                <FileText size={20} /> Détails du Marché
            </h3>
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <p className="whitespace-pre-line leading-relaxed">{tender.fullContent}</p>
            </div>
        </div>

        {/* --- STICKY BOTTOM ACTION BAR (Mobile & Desktop) --- */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-30">
            <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
                <div className="hidden md:block">
                    <p className="text-sm text-gray-500">Intéressé par ce marché ?</p>
                    <p className="text-xs font-medium text-gray-900">Date limite : {new Date(tender.deadline).toLocaleDateString()}</p>
                </div>

                {user && user.isAuthenticated ? (
                    <div className="flex-1 md:flex-none flex gap-3">
                        <button 
                            onClick={() => setChatOpen(true)}
                            className="flex-1 md:flex-none py-3 px-4 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition"
                        >
                            <span className="flex items-center justify-center gap-2">
                                <Sparkles size={18} />
                                <span className="hidden sm:inline">Assistant</span>
                            </span>
                        </button>
                        
                        {applicationStatus === 'success' ? (
                            <button disabled className="flex-1 md:w-64 py-3 px-6 rounded-xl bg-green-600 text-white font-bold shadow-sm flex items-center justify-center gap-2 cursor-default">
                                <CheckCircle size={20} />
                                Candidature envoyée !
                            </button>
                        ) : (
                            <button 
                                onClick={handleApply}
                                disabled={applicationStatus === 'applying'}
                                className="flex-1 md:w-64 py-3 px-6 rounded-xl bg-gray-900 hover:bg-black text-white font-bold shadow-lg hover:shadow-xl transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait"
                            >
                                {applicationStatus === 'applying' ? 'Envoi en cours...' : 'Postuler maintenant'}
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="flex-1 flex items-center justify-between md:justify-end gap-4">
                         <div className="flex items-center gap-2 text-amber-700 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100 text-sm flex-1 md:flex-none">
                            <Lock size={16} />
                            <span className="font-medium">Compte requis</span>
                         </div>
                         <button 
                            onClick={() => login({
                                id: 'demo-user',
                                name: 'Demo User',
                                companyName: 'BTP Solutions Demo',
                                email: 'demo@example.com',
                                isAuthenticated: true
                            })}
                            className="bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-blue-700 transition"
                        >
                            Se connecter
                        </button>
                    </div>
                )}
            </div>
        </div>

        {/* Chat Component (Similaire précédent mais plus clean) */}
        {chatOpen && (
             <div className="fixed bottom-24 right-4 w-[90vw] md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px] animate-in slide-in-from-bottom-10 fade-in duration-300">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <h3 className="font-bold text-gray-800">Afritenders Assistant</h3>
                    </div>
                    <button onClick={() => setChatOpen(false)} className="text-gray-400 hover:text-gray-600">×</button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                     {chatHistory.length === 0 && (
                        <div className="text-center mt-10 space-y-2">
                            <div className="bg-blue-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-2">
                                <Sparkles size={24} />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Comment puis-je vous aider ?</p>
                            <p className="text-xs text-gray-500">Demandez-moi de rédiger une lettre de motivation ou de vérifier l'éligibilité.</p>
                        </div>
                    )}
                    {chatHistory.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[85%] rounded-2xl p-3 text-sm ${
                                msg.role === 'user' ? 'bg-blue-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    {chatLoading && (
                         <div className="flex justify-start">
                             <div className="bg-gray-50 rounded-2xl rounded-bl-none p-3 text-sm text-gray-400 italic flex gap-1">
                                <span>•</span><span>•</span><span>•</span>
                             </div>
                        </div>
                    )}
                </div>
                <form onSubmit={handleChatSubmit} className="p-3 border-t border-gray-100 flex gap-2">
                    <input 
                        className="flex-1 bg-gray-50 border-0 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="Écrivez votre message..."
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                    />
                    <button type="submit" disabled={chatLoading} className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition disabled:opacity-50">
                        <Send size={18} />
                    </button>
                </form>
             </div>
        )}

      </div>
    </div>
  );
};