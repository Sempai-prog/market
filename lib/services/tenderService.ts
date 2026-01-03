import { RawTenderData } from "../../types";

// Simulation de l'interface DB (En prod: PrismaClient ou pg)
// Nous utilisons ici du SQL simulé pour illustrer la logique de l'Architecte
interface DBClient {
  query: (sql: string, params: any[]) => Promise<any>;
}

// Mock DB (A remplacer par `import { db } from '@/lib/db'`)
const db: DBClient = {
  query: async (sql, params) => {
    console.log(`[DB MOCK] Executing SQL: ${sql}`, params);
    // Simule une vérification d'existence
    if (sql.includes('SELECT id')) {
        // Pour la démo : retourne null (n'existe pas) 50% du temps
        return Math.random() > 0.5 ? { rows: [] } : { rows: [{ id: 'existing-uuid' }] };
    }
    return { rows: [] };
  }
};

export const TenderService = {
  /**
   * Logique principale d'ingestion (Idempotence)
   * Crée ou Met à jour un appel d'offres basé sur son URL Source.
   */
  createOrUpdateTender: async (data: RawTenderData): Promise<{ status: 'CREATED' | 'UPDATED' | 'SKIPPED', id?: string }> => {
    try {
      if (!data.sourceUrl) {
        throw new Error("Source URL is mandatory for ingestion uniqueness");
      }

      // 1. Vérification de l'existence (Deduplication)
      const checkRes = await db.query(
        `SELECT id, deadline FROM appels_offres WHERE source_url = $1 LIMIT 1`, 
        [data.sourceUrl]
      );
      
      const existingTender = checkRes.rows[0];

      if (existingTender) {
        // 2. Logique de Mise à jour (Update)
        // On ne met à jour que si la date limite a changé (prolongation fréquente) ou si le statut a changé
        const existingDeadline = new Date(existingTender.deadline).getTime();
        const newDeadline = new Date(data.deadline).getTime();

        if (newDeadline !== existingDeadline) {
          await db.query(
            `UPDATE appels_offres SET 
                deadline = $1, 
                title = $2, 
                updated_at = NOW() 
             WHERE id = $3`,
            [data.deadline, data.title, existingTender.id]
          );
          return { status: 'UPDATED', id: existingTender.id };
        }
        
        return { status: 'SKIPPED', id: existingTender.id };

      } else {
        // 3. Logique de Création (Insert)
        // Génération d'ID via UUID v4 (normalement géré par la DB avec gen_random_uuid())
        const newId = crypto.randomUUID(); 
        
        await db.query(
          `INSERT INTO appels_offres (
            id, reference, title, authority, country, sector, 
            description, full_content, deadline, created_at, 
            source_url, is_premium
           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), $10, $11)`,
          [
            newId,
            data.reference || `REF-${Date.now()}`,
            data.title,
            data.authority,
            data.country,
            data.sector,
            data.description,
            data.fullContent,
            data.deadline,
            data.sourceUrl,
            false // Default premium status
          ]
        );

        return { status: 'CREATED', id: newId };
      }

    } catch (error) {
      console.error("Ingestion Error:", error);
      throw error;
    }
  }
};
