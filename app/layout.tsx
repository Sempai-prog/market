import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css"; // Assure que Tailwind est chargé

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Afritenders Pro | L'Intelligence des Marchés Publics Africains",
  description: "Accédez aux appels d'offres du Cameroun, Sénégal, Côte d'Ivoire et Bénin. Analyse par IA, alertes en temps réel et accompagnement stratégique pour PME.",
  keywords: ["Marchés publics Afrique", "Appels d'offres Cameroun", "BTP Afrique", "Tender Management", "Intelligence Artificielle"],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://afritenders.pro",
    title: "Afritenders Pro",
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
        {/* Fallback Tailwind CDN si le build process n'est pas complet dans cet environnement de démo */}
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
