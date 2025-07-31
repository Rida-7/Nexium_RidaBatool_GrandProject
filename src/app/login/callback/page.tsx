'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const processSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session?.user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    };

    processSession();
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <p>Redirecting...</p>
    </main>
  );
}
