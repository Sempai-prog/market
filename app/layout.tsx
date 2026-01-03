import React from 'react';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "TenderHub Africa | Marchés Publics & IA",
  description: "La première plateforme d'intelligence économique pour les appels d'offres en Afrique. Analyse IA, veille stratégique et conformité OHADA.",
  keywords: ["Marchés publics Afrique", "Appels d'offres Cameroun", "Sénégal BTP", "TenderHub", "Intelligence Artificielle"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://tenderhub.africa",
    title: "TenderHub Africa",
    description: "Gagnez plus de marchés publics grâce à l'IA.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Fallback Tailwind pour l'environnement de démo si le build process est incomplet */}
        <script src="https://cdn.tailwindcss.com"></script>
      </head>
      <body className={`${inter.className} bg-slate-50 text-slate-900 antialiased selection:bg-blue-100 selection:text-blue-900`}>
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}