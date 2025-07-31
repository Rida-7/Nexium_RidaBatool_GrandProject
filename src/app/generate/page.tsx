"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChefHat, Loader2, Sparkles, Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenerateRecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState<string | null>(null);
  const [recipe_title, setRecipe_title] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  // Get current user email on mount
  useEffect(() => {
    const getUserEmail = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        router.push("/login"); // redirect to login if no session
      } else {
        setEmail(session.user.email ?? null);
      }
    };
    getUserEmail();
  }, [router]);

  const generateRecipe = async () => {
    setLoading(true);
    setRecipe(null);
    try {
      const res = await fetch("https://ridabatool7450.app.n8n.cloud/webhook-test/generate-recipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          ingredients,
          prompt: `Suggest a recipe using these ingredients: ${ingredients}. Return a title and the recipe steps.`,
        }),
      });

      const data = await res.json();
      console.log("API response:", data);


      // Fix: if it's an array, extract the first item
      const recipeData = Array.isArray(data) ? data[0] : data;

      if (recipeData?.recipe) {
        setRecipe(recipeData.recipe);
        setRecipe_title(recipeData.recipe_title);
      } else {
        console.error("Invalid recipe data:", recipeData);
        setRecipe(" No recipe returned. Please try again.");
      }
    } catch (err) {
      console.error("Error generating recipe:", err);
      setRecipe(" Error generating recipe. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  const extractRecipeTitle = (text: string) => {
    const titleLine = text.split("\n").find((line) =>
      line.toLowerCase().includes("recipe title")
    );
    return titleLine
      ? titleLine.replace(/recipe title:\s*/i, "").trim()
      : "Untitled Recipe";
  };

  const saveRecipe = async () => {
    if (!recipe || !email) return;

    const title = recipe_title ?? extractRecipeTitle(recipe);

    const { error } = await supabase.from("recipes").insert({
      email,
      ingredients,
      recipe,
      recipe_title: title,
    });

    if (error) {
      alert(" Failed to save recipe.");
    } else {
      alert(" Recipe saved successfully!");
    }
  };



const handleLogout = async () => {
  await supabase.auth.signOut();
  router.push("/login");
};

return (
  <main className="min-h-screen bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-[#1f1f1f] dark:via-[#121212] dark:to-black px-4 pt-24 pb-12 text-foreground">
    {/* Header */}
    <header className="fixed top-0 left-0 w-full px-6 py-4 border-b bg-background/80 backdrop-blur-lg z-50 flex items-center justify-between">
      <div className="flex items-center gap-2 font-bold text-xl text-emerald-600 dark:text-emerald-400">
        <ChefHat className="w-6 h-6" /> AI Recipe
      </div>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Button variant="secondary" onClick={() => router.push('/dashboard')}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    </header>

    {/* Main Section */}
    <section className="max-w-3xl mx-auto">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-6"
      >
        Generate a Custom Recipe
      </motion.h1>

      <p className="text-muted-foreground text-center max-w-xl mx-auto mb-8">
        Enter the ingredients you have, and our AI will generate a delicious recipe for you.
      </p>

      <div className="bg-white dark:bg-[#1b1b1b] border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-xl space-y-4">
        <textarea
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g. tomatoes, chicken, garlic"
          rows={4}
          className="w-full p-3 rounded-xl bg-muted/10 border dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-sky-400"
        />

        <Button
          onClick={generateRecipe}
          disabled={loading || !ingredients.trim()}
          className="w-full bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 animate-spin" /> Generating...
            </>
          ) : (
            <>
              <Sparkles className="mr-2" /> Generate Recipe
            </>
          )}
        </Button>
      </div>

      {/* Recipe Display */}
      {recipe && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-10 bg-white dark:bg-[#1b1b1b] border border-gray-300 dark:border-gray-700 rounded-2xl p-6 shadow-xl space-y-4"
        >
          <h2 className="text-2xl font-bold mb-2">{recipe_title}</h2>
          <pre className="whitespace-pre-wrap text-muted-foreground text-sm leading-relaxed">
            {recipe}
          </pre>
          <Button onClick={saveRecipe} className="gap-2">
            <Save size={16} /> Save Recipe
          </Button>
        </motion.div>
      )}
    </section>

    <footer className="text-center mt-16 text-muted-foreground text-sm">
      © {new Date().getFullYear()} AI Recipe Generator
    </footer>
  </main>
);
}
