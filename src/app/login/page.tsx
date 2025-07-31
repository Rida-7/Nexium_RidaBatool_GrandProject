'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

export default function AuthPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const redirectUrl = `${window.location.origin}/dashboard`; 

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/login/callback`
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-[#1f1f1f] dark:via-[#121212] dark:to-black flex flex-col items-center justify-center px-4">
      {/* Theme Toggle */}
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>

      {/* Form Container */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white dark:bg-[#1b1b1b] border border-gray-200 dark:border-gray-800 shadow-xl rounded-2xl p-8 w-full max-w-md text-center"
      >
        <h1 className="text-3xl font-bold mb-4 text-foreground">Let's Get Cooking</h1>
        <p className="text-muted-foreground mb-6 text-sm">
          Enter your email to receive a secure magic login link.
        </p>

        {submitted ? (
          <p className="text-emerald-600 dark:text-emerald-400 font-medium">
             Check your email for the login link!
          </p>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full px-4 py-2 rounded-xl border dark:border-gray-700 bg-white dark:bg-black dark:text-white focus:outline-none focus:ring-2 focus:ring-sky-400"
            />
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600"
            >
              Send Magic Link
            </Button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        )}
      </motion.div>

      {/* Footer */}
      <footer className="mt-10 text-muted-foreground text-sm">
        © {new Date().getFullYear()} AI Recipe Generator
      </footer>
    </main>
  );
}
