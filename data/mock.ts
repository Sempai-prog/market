import { Tender, Country, Sector } from '../types';

export const MOCK_TENDERS: Tender[] = [
  {
    id: '1',
    reference: 'AO-2024-CM-001',
    title: 'Construction d\'une route bitumée de 15km - Axe Yaoundé-Sud',
    authority: 'Ministère des Travaux Publics (Cameroun)',
    country: Country.CAMEROUN,
    sector: Sector.BTP,
    deadline: '2024-06-15T12:00:00Z',
    budget: '450,000,000 FCFA',
    isPremium: true,
    publishedAt: '2024-05-01',
    description: 'Le Ministère lance un appel d\'offres pour les travaux de réhabilitation et de bitumage...',
    fullContent: `LOT UNIQUE : Travaux de bitumage en enduit superficiel bicouche.
    
    1. OBJET
    Les travaux comprennent :
    - Installation de chantier
    - Terrassements généraux
    - Chaussée (couche de fondation, couche de base)
    - Revêtement bicouche
    - Assainissement et drainage

    2. CONDITIONS DE PARTICIPATION
    La participation est ouverte à égalité de conditions à toutes les entreprises de droit camerounais.

    3. FINANCEMENT
    Budget d'Investissement Public (BIP) 2024.

    4. CAUTION DE SOUMISSION
    Chaque soumissionnaire devra joindre une caution de soumission de 2% du montant prévisionnel, soit 9 000 000 FCFA.
    `
  },
  {
    id: '2',
    reference: 'AO-2024-BN-042',
    title: 'Fourniture de 500 ordinateurs portables et équipements réseaux',
    authority: 'Agence Nationale du Numérique (Bénin)',
    country: Country.BENIN,
    sector: Sector.IT,
    deadline: '2024-05-30T10:00:00Z',
    budget: '120,000,000 FCFA',
    isPremium: false,
    publishedAt: '2024-05-10',
    description: 'Acquisition de matériel informatique pour l\'équipement des lycées techniques...',
    fullContent: `Le présent marché a pour objet la fourniture, l'installation et la mise en service d'équipements informatiques.
    
    Spécifications techniques minimales :
    - Processeur i5 12ème génération ou équivalent
    - 16 Go RAM, 512 Go SSD
    - Garantie 3 ans sur site
    
    Critères d'attribution :
    - Prix : 60%
    - Valeur technique : 40%
    
    Délai de livraison : 45 jours max.`
  },
  {
    id: '3',
    reference: 'AO-2024-SN-112',
    title: 'Étude d\'impact environnemental pour le projet portuaire',
    authority: 'Port Autonome de Dakar (Sénégal)',
    country: Country.SENEGAL,
    sector: Sector.CONSULTING,
    deadline: '2024-07-01T16:00:00Z',
    isPremium: true,
    publishedAt: '2024-05-12',
    description: 'Sélection d\'un cabinet pour réaliser l\'EIES du nouveau terminal à conteneurs...',
    fullContent: `Mission de consultant pour l'étude d'impact environnemental et social.
    Le consultant doit justifier d'au moins 10 ans d'expérience dans les projets maritimes.
    
    Personnel clé requis :
    - 1 Chef de mission (Expert Environnementaliste, Bac+5, 15 ans exp)
    - 1 Sociologue
    - 1 Hydrologue`
  },
  {
    id: '4',
    reference: 'AO-2024-CI-088',
    title: 'Approvisionnement en médicaments essentiels',
    authority: 'Pharmacie de la Santé Publique (Côte d\'Ivoire)',
    country: Country.COTE_IVOIRE,
    sector: Sector.MEDICAL,
    deadline: '2024-05-25T09:00:00Z',
    budget: '800,000,000 FCFA',
    isPremium: false,
    publishedAt: '2024-05-05',
    description: 'Fourniture de médicaments génériques pour les CHU d\'Abidjan...',
    fullContent: `Appel d'offres international ouvert.
    Lots :
    1. Antibiotiques
    2. Antalgiques
    3. Solutés injectables
    
    Certifications requises : BPD (Bonnes Pratiques de Distribution), Autorisation de Mise sur le Marché (AMM) Ivoirienne.`
  }
];