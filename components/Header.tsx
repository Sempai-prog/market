import React from 'react';
import { Menu, Bell, User } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 md:hidden">
              <Menu size={24} />
            </button>
            <div className="flex-shrink-0 flex items-center ml-2 md:ml-0 gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">A</div>
              <span className="font-bold text-xl tracking-tight text-gray-900 hidden sm:block">
                Afritenders<span className="text-blue-600">Pro</span>
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="relative cursor-pointer">
                <Bell size={20} className="text-gray-500 hover:text-gray-700" />
                <span className="absolute -top-1 -right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
             </div>
             <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 cursor-pointer hover:bg-gray-300 transition">
                <User size={16} />
             </div>
          </div>
        </div>
      </div>
    </header>
  );
};