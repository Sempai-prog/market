import React from 'react';
import { Menu, Bell, User, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden">
              <Menu size={24} />
            </button>
            <Link href="/dashboard" className="flex-shrink-0 flex items-center ml-2 md:ml-0 gap-2">
              <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white shadow-md">
                <BrainCircuit size={18} className="text-amber-400" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
                TenderHub <span className="text-blue-700">Africa</span>
              </span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative cursor-pointer group">
                <Bell size={20} className="text-gray-500 group-hover:text-blue-700 transition" />
                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
             </div>
             <div className="h-8 w-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 cursor-pointer hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
                <User size={16} />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};
