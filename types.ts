export enum Country {
  CAMEROUN = 'Cameroun',
  COTE_IVOIRE = 'Côte d\'Ivoire',
  SENEGAL = 'Sénégal',
  BENIN = 'Bénin',
  RDC = 'RDC',
  UNKNOWN = 'Afrique (Autre)'
}

export enum Sector {
  BTP = 'BTP & Infrastructures',
  IT = 'Informatique & Télécoms',
  MEDICAL = 'Santé & Médical',
  FOURNITURES = 'Fournitures Générales',
  CONSULTING = 'Études & Conseil',
  AUTRE = 'Autre'
}

export interface Tender {
  id: string;
  reference: string;
  title: string;
  authority: string; // Autorité contractante
  country: Country;
  sector: Sector;
  budget?: string;
  deadline: string; // ISO Date
  description: string;
  fullContent: string; // Contenu détaillé pour l'IA
  isPremium: boolean;
  publishedAt: string;
}

export type ViewState = 'LIST' | 'DETAIL' | 'PROFILE';

export interface AIAnalysisResult {
  summary: string;
  keyRequirements: string[];
  riskScore: number; // 1-100
  winningStrategy: string;
}

export interface User {
  id: string;
  name?: string; // Optionnel car l'API login ne renvoie pas toujours le nom complet au début
  companyName: string;
  email: string;
  isAuthenticated: boolean;
}

export interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Structure de données normalisée avant insertion en base
export interface RawTenderData {
  reference?: string;
  title: string;
  authority: string;
  country: Country;
  sector: Sector;
  description: string;
  fullContent?: string;
  deadline: string; // Format ISO string YYYY-MM-DD
  publishedAt: string; // Format ISO string YYYY-MM-DD
  sourceUrl: string; // Clé d'unicité pour le scraping
  budget?: string;
}
