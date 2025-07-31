'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft } from 'lucide-react';

const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function SavedRecipesPage() {
  const router = useRouter();
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session?.user?.email) {
        router.replace('/login');
        return;
      }

      const userEmail = session.user.email;
      setEmail(userEmail);

      const { data, error } = await supabase
        .from('recipes')
        .select('*')
        .eq('email', userEmail)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching recipes:', error.message);
      } else {
        setRecipes(data);
      }

      setLoading(false);
    };

    fetchRecipes();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="animate-spin w-6 h-6 text-muted" />
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-[#1f1f1f] dark:via-[#121212] dark:to-black text-foreground">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold">Saved Recipes</h1>
        <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="secondary" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
      </header>

      {recipes.length === 0 ? (
        <p className="text-muted-foreground">You have no saved recipes yet.</p>
      ) : (
        <div className="space-y-6">
          {recipes.map((r) => (
            <div
              key={r.id}
              className="bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-gray-700 rounded-xl p-5 shadow-lg"
            >
              <h2 className="text-xl font-semibold mb-2">{r.recipe_title}</h2>
              <p className="text-sm text-muted-foreground mb-1">
                Ingredients: {r.ingredients}
              </p>
              <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
                {r.recipe}
              </pre>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
