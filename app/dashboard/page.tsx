"use client";

import React, { useState, useMemo } from 'react';
import { Tender, Country } from '@/types';
import { MOCK_TENDERS } from '@/data/mock';
import { TenderCard } from '@/components/TenderCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<Country | 'ALL'>('ALL');

  // Filtrage Client-Side (En prod: passerait par URL params + Server Action)
  const filteredTenders = useMemo(() => {
    return MOCK_TENDERS.filter(tender => {
      const matchesSearch = tender.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            tender.authority.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCountry = selectedCountry === 'ALL' || tender.country === selectedCountry;
      return matchesSearch && matchesCountry;
    });
  }, [searchQuery, selectedCountry]);

  // Navigation vers la page détail (Dynamic Route)
  const handleTenderClick = (tender: Tender) => {
    router.push(`/dashboard/tenders/${tender.id}`);
  };

  return (
    <div className="animate-fade-in-up">
      {/* Hero / Search Section */}
      <div className="mb-8 space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Opportunités & Marchés</h1>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="text-gray-400" size={20} />
            </div>
            <input
              type="text"
              placeholder="Rechercher (ex: Route, Logiciel, BTP...)"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm transition"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 md:pb-0">
            <select 
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value as Country | 'ALL')}
              className="block w-40 pl-3 pr-8 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-lg bg-white shadow-sm cursor-pointer"
            >
              <option value="ALL">Tous les pays</option>
              {Object.values(Country).map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition">
              <SlidersHorizontal size={18} className="mr-2" />
              Filtres
            </button>
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {filteredTenders.map(tender => (
          <TenderCard 
            key={tender.id} 
            tender={tender} 
            onClick={handleTenderClick} 
          />
        ))}
        
        {filteredTenders.length === 0 && (
          <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-dashed border-gray-300">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-50 mb-4">
              <Filter className="text-gray-400" size={32} />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Aucun résultat</h3>
            <p className="mt-1 text-gray-500">Modifiez vos critères de recherche.</p>
          </div>
        )}
      </div>
    </div>
  );
}
