"use client";

import React, { use } from 'react';
import { useRouter } from 'next/navigation';
import { TenderDetail } from '@/components/TenderDetail';

export default function TenderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  
  // Unwrap params using React.use() for Next.js 15
  const { id } = use(params);

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="animate-fade-in">
      <TenderDetail tenderId={id} onBack={handleBack} />
    </div>
  );
}
