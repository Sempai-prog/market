import { GoogleGenAI, Type } from "@google/genai";
import { Tender, AIAnalysisResult } from "../types";

// Initialisation sécurisée
const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeTender = async (tender: Tender): Promise<AIAnalysisResult> => {
  try {
    const ai = getAI();
    
    const prompt = `
      Tu es un expert en marchés publics en Afrique (Code des marchés publics zone OHADA/CEMAC).
      Analyse l'appel d'offre suivant pour une PME.
      
      Titre: ${tender.title}
      Pays: ${tender.country}
      Description technique: ${tender.fullContent}

      Génère une réponse JSON stricte selon le schéma fourni.
      - summary: Résumé exécutif en 2 phrases.
      - keyRequirements: Liste des 3 documents ou certifications techniques critiques.
      - riskScore: Un nombre de 0 à 100 estimant la complexité/risque (100 = très risqué).
      - winningStrategy: Une phrase conseil pour gagner ce marché.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: { type: Type.STRING },
            keyRequirements: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            },
            riskScore: { type: Type.NUMBER },
            winningStrategy: { type: Type.STRING }
          },
          required: ["summary", "keyRequirements", "riskScore", "winningStrategy"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    return result as AIAnalysisResult;

  } catch (error) {
    console.error("Erreur Gemini:", error);
    return {
      summary: "Analyse indisponible pour le moment.",
      keyRequirements: ["Erreur de connexion IA"],
      riskScore: 0,
      winningStrategy: "Veuillez réessayer l'analyse."
    };
  }
};

export const chatWithTender = async (history: string[], message: string, context: string) => {
    try {
        const ai = getAI();
        const systemInstruction = `Tu es "Afritenders Bot", un assistant spécialisé dans l'aide à la soumission aux appels d'offres.
        Contexte du dossier actuel : ${context}.
        Réponds de manière concise, professionnelle et encourageante.`;

        const chat = ai.chats.create({
            model: 'gemini-3-flash-preview',
            config: { systemInstruction }
        });

        // Note: For a real chat, we would replay history here. 
        // For this demo, we assume stateless single turn or handled externally.
        const result = await chat.sendMessage({ message });
        return result.text;
    } catch (e) {
        console.error(e);
        return "Désolé, je ne peux pas répondre pour le moment.";
    }
}