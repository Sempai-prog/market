import { Country, Sector, RawTenderData } from "../types";

/**
 * Nettoie les chaînes de caractères (espaces multiples, trim)
 */
const cleanString = (str: any): string => {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\s+/g, ' ').trim();
};

/**
 * Tente de parser une date depuis divers formats (FR, EN, ISO)
 * Formats supportés : DD/MM/YYYY, YYYY-MM-DD, DD-MM-YYYY
 */
const parseDate = (dateStr: any): string => {
  if (!dateStr) return new Date().toISOString();
  
  const clean = cleanString(dateStr);
  
  // Format DD/MM/YYYY
  const frRegex = /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/;
  const frMatch = clean.match(frRegex);
  if (frMatch) {
    const [_, day, month, year] = frMatch;
    // Note: Month is 0-indexed in JS Date, but we construct ISO string directly to avoid timezone issues
    return new Date(`${year}-${month}-${day}`).toISOString();
  }

  // Fallback: Tentative standard (ISO)
  const date = new Date(clean);
  if (!isNaN(date.getTime())) {
    return date.toISOString();
  }

  // Défaut : Date du jour + 1 mois (Sécurité pour éviter plantage)
  const fallback = new Date();
  fallback.setMonth(fallback.getMonth() + 1);
  return fallback.toISOString();
};

/**
 * Détecte le pays basé sur le texte (titre + autorité)
 */
const detectCountry = (text: string): Country => {
  const t = text.toLowerCase();
  if (t.includes('cameroun') || t.includes('yaoundé') || t.includes('douala')) return Country.CAMEROUN;
  if (t.includes('ivoire') || t.includes('abidjan') || t.includes('yamoussoukro')) return Country.COTE_IVOIRE;
  if (t.includes('sénégal') || t.includes('dakar')) return Country.SENEGAL;
  if (t.includes('bénin') || t.includes('cotonou')) return Country.BENIN;
  if (t.includes('rdc') || t.includes('congo') || t.includes('kinshasa')) return Country.RDC;
  return Country.UNKNOWN;
};

/**
 * Détecte le secteur basé sur des mots-clés
 */
const detectSector = (text: string): Sector => {
  const t = text.toLowerCase();
  if (t.includes('route') || t.includes('bâtiment') || t.includes('travaux') || t.includes('construction')) return Sector.BTP;
  if (t.includes('logiciel') || t.includes('ordinateur') || t.includes('réseau') || t.includes('numérique')) return Sector.IT;
  if (t.includes('médicament') || t.includes('hôpital') || t.includes('santé') || t.includes('pharmaceutique')) return Sector.MEDICAL;
  if (t.includes('étude') || t.includes('audit') || t.includes('conseil') || t.includes('formation')) return Sector.CONSULTING;
  if (t.includes('fourniture') || t.includes('équipement') || t.includes('matériel')) return Sector.FOURNITURES;
  return Sector.AUTRE;
};

/**
 * Fonction principale de normalisation
 * Transforme un objet JSON "sale" (any) en RawTenderData strict
 */
export const normalizeTender = (raw: any): RawTenderData => {
  const title = cleanString(raw.title || raw.objet || raw.name);
  const authority = cleanString(raw.authority || raw.client || raw.organisme);
  const description = cleanString(raw.description || raw.details || '');
  
  // Concaténation pour l'analyse sémantique
  const fullTextContext = `${title} ${authority} ${description}`;

  return {
    title: title || "Titre Non Spécifié",
    authority: authority || "Autorité Inconnue",
    reference: cleanString(raw.reference || raw.ref),
    sourceUrl: cleanString(raw.sourceUrl || raw.url || raw.link),
    
    // Logique heuristique si donnée manquante
    country: raw.country ? (raw.country as Country) : detectCountry(fullTextContext),
    sector: raw.sector ? (raw.sector as Sector) : detectSector(fullTextContext),
    
    description: description.substring(0, 500), // Limite pour la preview
    fullContent: cleanString(raw.fullContent || description),
    
    deadline: parseDate(raw.deadline || raw.dateLimite || raw.closingDate),
    publishedAt: parseDate(raw.publishedAt || raw.datePublication),
    
    budget: cleanString(raw.budget || raw.montant),
  };
};
