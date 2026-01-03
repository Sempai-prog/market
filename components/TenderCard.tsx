import React from 'react';
import { Tender, Sector } from '../types';
import { Calendar, MapPin, Briefcase } from 'lucide-react';
import { Badge } from './Badge';

interface TenderCardProps {
  tender: Tender;
  onClick: (t: Tender) => void;
}

export const TenderCard: React.FC<TenderCardProps> = ({ tender, onClick }) => {
  const isUrgent = new Date(tender.deadline).getTime() - new Date().getTime() < 7 * 24 * 60 * 60 * 1000;

  return (
    <div 
      onClick={() => onClick(tender)}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] duration-200"
    >
      <div className="flex justify-between items-start mb-3">
        <Badge variant={tender.sector === Sector.BTP ? 'warning' : 'default'}>
            {tender.sector}
        </Badge>
        {isUrgent && <Badge variant="danger">Urgent</Badge>}
      </div>
      
      <h3 className="text-lg font-semibold text-gray-900 leading-tight mb-2 line-clamp-2">
        {tender.title}
      </h3>
      
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">
        {tender.authority}
      </p>
      
      <div className="flex flex-col gap-2 text-sm text-gray-600">
        <div className="flex items-center gap-2">
            <MapPin size={16} className="text-gray-400" />
            <span>{tender.country}</span>
        </div>
        <div className="flex items-center gap-2">
            <Calendar size={16} className={isUrgent ? 'text-red-400' : 'text-gray-400'} />
            <span className={isUrgent ? 'text-red-600 font-medium' : ''}>
                Clôture le {new Date(tender.deadline).toLocaleDateString('fr-FR')}
            </span>
        </div>
        {tender.budget && (
             <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-gray-400" />
                <span>Budget est.: {tender.budget}</span>
             </div>
        )}
      </div>
    </div>
  );
};