"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterSchema, RegisterInput } from '@/lib/validators';
import { Country } from '@/types';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, AlertCircle, Building2 } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    setServerError(null);
    try {
      // Simulation appel API d'inscription
      // const response = await fetch('/api/auth/register', ...);
      
      // Simulation Délai
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Succès simulé
      router.push('/login?registered=true');
      
    } catch (err: any) {
      setServerError(err.message || "Impossible de créer le compte.");
    }
  };

  return (
    <div className="animate-fade-in-up">
      <div className="mb-6">
        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Créer un compte
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          Rejoignez le réseau leader des PME africaines.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {serverError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3 text-red-700 text-sm">
            <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
            <span>{serverError}</span>
          </div>
        )}

        <div>
          <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
            Nom de l'entreprise
          </label>
          <div className="mt-1 relative">
            <input
              id="companyName"
              type="text"
              className={`appearance-none block w-full px-3 py-3 pl-10 border ${errors.companyName ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition`}
              placeholder="Ex: BTP Solutions SARL"
              {...register('companyName')}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <Building2 size={18} />
            </div>
            {errors.companyName && (
              <p className="mt-1 text-sm text-red-600">{errors.companyName.message}</p>
            )}
          </div>
        </div>

        <div>
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">Pays du siège</label>
            <select 
                id="country" 
                {...register('country')}
                className={`mt-1 block w-full pl-3 pr-10 py-3 text-base border ${errors.country ? 'border-red-300' : 'border-gray-300'} focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-xl bg-white`}
            >
                <option value="">Sélectionnez un pays...</option>
                {Object.values(Country).map(c => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>
            {errors.country && (
                <p className="mt-1 text-sm text-red-600">{errors.country.message}</p>
            )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email professionnel
          </label>
          <div className="mt-1">
            <input
              id="email"
              type="email"
              className={`appearance-none block w-full px-3 py-3 border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition`}
              placeholder="contact@entreprise.com"
              {...register('email')}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
            )}
          </div>
        </div>

        <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mot de passe
            </label>
            <div className="mt-1">
                <input
                id="password"
                type="password"
                className={`appearance-none block w-full px-3 py-3 border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'} rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition`}
                placeholder="8+ caractères, majuscule & chiffre"
                {...register('password')}
                />
                {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                )}
            </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label htmlFor="ninea" className="block text-sm font-medium text-gray-700">NINEA (Optionnel)</label>
                <input
                id="ninea"
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register('ninea')}
                />
            </div>
            <div>
                <label htmlFor="rcNumber" className="block text-sm font-medium text-gray-700">RCCM (Optionnel)</label>
                <input
                id="rcNumber"
                type="text"
                className="mt-1 appearance-none block w-full px-3 py-3 border border-gray-300 rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                {...register('rcNumber')}
                />
            </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 disabled:opacity-70 disabled:cursor-not-allowed transition"
          >
            {isSubmitting ? (
              <><Loader2 className="animate-spin mr-2" size={20} /> Création...</>
            ) : (
              'Créer mon compte'
            )}
          </button>
        </div>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Déjà un compte ?{' '}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
