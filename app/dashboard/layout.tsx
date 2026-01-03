import React from 'react';
import { Header } from '@/components/Header';

// Ce layout enveloppe toutes les pages /dashboard/*
// Il assure que le Header est toujours présent
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>
    </div>
  );
}
