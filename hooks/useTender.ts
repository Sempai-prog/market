import { useState, useEffect } from 'react';
import { Tender } from '../types';
import { MOCK_TENDERS } from '../data/mock';

interface UseTenderResult {
  tender: Tender | null;
  loading: boolean;
  error: string | null;
}

export const useTender = (id: string | null): UseTenderResult => {
  const [tender, setTender] = useState<Tender | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
        setLoading(false);
        return;
    }

    setLoading(true);
    setError(null);

    // Simulation d'un délai réseau (latency 3G Afrique simulation)
    const timer = setTimeout(() => {
      const foundTender = MOCK_TENDERS.find(t => t.id === id);
      
      if (foundTender) {
        setTender(foundTender);
      } else {
        setError("Appel d'offre introuvable.");
      }
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [id]);

  return { tender, loading, error };
};