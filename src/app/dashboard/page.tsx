'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import {
  RocketIcon,
  ChefHat,
  LogOutIcon,
  BookOpenIcon,
  HeartIcon,
} from 'lucide-react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function DashboardPage() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setUserEmail(session.user.email);
      } else {
        router.replace('/login');
      }
      setLoading(false);
    };

    getSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user?.email) {
          setUserEmail(session.user.email);
        } else {
          router.replace('/login');
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
        <p>Loading your recipe dashboard...</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-[#1f1f1f] dark:via-[#121212] dark:to-black text-foreground font-sans transition-colors">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">Welcome, Chef!</h1>
          <p className="text-sm text-muted-foreground">
            Signed in as <span className="font-medium">{userEmail}</span>
          </p>
        </div>
        <div className="flex gap-3 items-center">
          <ThemeToggle />
          <Button variant="outline" onClick={handleLogout} className="gap-2">
            <LogOutIcon size={16} /> Logout
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-20 md:py-28">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-sky-700 dark:text-sky-300">
          Craft Culinary Magic with AI 
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto mb-8 text-lg">
          Let AI transform your ingredients into delicious recipes crafted just for you.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button
            size="lg"
            className="text-base font-semibold gap-2 bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600"
            onClick={() => router.push('/generate')}
          >
            <RocketIcon size={18} /> Generate a Recipe
          </Button>
          <Button
            variant="secondary"
            size="lg"
            className="text-base font-semibold gap-2"
            onClick={() => router.push('/saved')}
          >
            <BookOpenIcon size={18} /> View Saved Recipes
          </Button>
        </div>
      </section>

      {/* Features */}
      <section className="px-6 pb-24 max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
        {features.map(({ Icon, title, description, color }, i) => (
          <div
            key={i}
            className="flex items-start gap-4 bg-gradient-to-br from-white to-emerald-100 dark:from-[#1a1a1a] dark:to-[#2a2a2a] p-6 rounded-2xl shadow-lg hover:scale-[1.02] transition-transform"
          >
            <Icon size={36} className={`text-${color}-600 dark:text-${color}-400`} />
            <div>
              <h3 className="text-xl font-semibold mb-1">{title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-muted-foreground text-sm">
        © {new Date().getFullYear()} AI Recipe Generator. All rights reserved.
      </footer>
    </main>
  );
}

const features = [
  {
    Icon: ChefHat,
    title: 'AI-Powered Cooking Partner',
    description:
      'Tell it what’s in your fridge, and get instant recipe ideas curated by AI.',
    color: 'emerald',
  },
  {
    Icon: RocketIcon,
    title: 'Lightning Fast Suggestions',
    description:
      'Powered by n8n and generative AI — responses are fast and delicious.',
    color: 'sky',
  },
  {
    Icon: HeartIcon,
    title: 'Save Your Favorites',
    description:
      'Create your personal recipe book and never lose a delicious moment.',
    color: 'red',
  },
  {
    Icon: BookOpenIcon,
    title: 'Explore Global Cuisines',
    description:
      'Discover dishes from every continent and expand your culinary skills.',
    color: 'indigo',
  },
];
