import { z } from "zod";
import { Country, Sector } from "../types";

// Validation Inscription
export const RegisterSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .email({ message: "Format d'email invalide" }),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .regex(/[A-Z]/, { message: "Le mot de passe doit contenir au moins une majuscule" })
    .regex(/[0-9]/, { message: "Le mot de passe doit contenir au moins un chiffre" }),
  companyName: z
    .string({ required_error: "Le nom de l'entreprise est requis" })
    .min(2, { message: "Nom trop court" }),
  country: z.nativeEnum(Country, { errorMap: () => ({ message: "Veuillez sélectionner un pays valide" }) }).optional(),
  ninea: z.string().optional(),
  rcNumber: z.string().optional(),
});

// Validation Connexion
export const LoginSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .email({ message: "Format d'email invalide" }),
  password: z.string().min(1, "Le mot de passe est requis"),
});

// Validation Création Profil de Recherche
export const SearchProfileSchema = z.object({
  name: z.string().min(1, "Donnez un nom à cette alerte"),
  keywords: z.array(z.string()).optional(),
  targetCountries: z
    .array(z.nativeEnum(Country))
    .min(1, "Sélectionnez au moins un pays cible"),
  targetSectors: z
    .array(z.nativeEnum(Sector))
    .min(1, "Sélectionnez au moins un secteur d'activité"),
  frequency: z.enum(['DAILY', 'WEEKLY', 'INSTANT']).default('DAILY'),
});

// Validation Candidature
export const CandidatureSchema = z.object({
  tenderId: z.string().uuid("ID de l'appel d'offre invalide"),
  coverLetter: z
    .string({ required_error: "La lettre de motivation est requise" })
    .min(50, "Votre lettre de motivation est trop courte (min. 50 caractères)"),
  // Simulation de validation de fichier (en prod, on validerait le FileList ou l'URL uploadée)
  hasDocuments: z.boolean().refine(val => val === true, {
    message: "Veuillez joindre les documents requis (RCCM, NINEA, etc.)"
  })
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
export type LoginInput = z.infer<typeof LoginSchema>;
export type SearchProfileInput = z.infer<typeof SearchProfileSchema>;
export type CandidatureInput = z.infer<typeof CandidatureSchema>;
