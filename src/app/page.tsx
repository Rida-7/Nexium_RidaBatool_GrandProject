'use client';

import Link from "next/link";
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { motion } from 'framer-motion';
import { ChefHat, WandSparkles, Clock, Lightbulb, Menu, X } from 'lucide-react';

export default function HomePage() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans transition-colors">
      {/* Navbar */}
      <header className="w-full px-6 py-4 border-b bg-background/80 backdrop-blur-md fixed z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 font-bold text-xl text-emerald-600 dark:text-emerald-400">
            <ChefHat className="w-6 h-6" />
            AI Recipe
          </div>
          <nav className="hidden md:flex gap-6 items-center text-sm font-medium text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition">Features</a>
            <a href="#how" className="hover:text-foreground transition">How It Works</a>
            <a href="/login" className="hover:text-foreground transition">Login</a>
            <ThemeToggle />
          </nav>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setMobileNavOpen(!mobileNavOpen)}>
              {mobileNavOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        {mobileNavOpen && (
          <div className="md:hidden mt-2 px-4 py-3 rounded-lg bg-muted/30 backdrop-blur-md shadow">
            <a href="#features" className="block py-2">Features</a>
            <a href="#how" className="block py-2">How It Works</a>
            <a href="/login" className="block py-2">Login</a>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-40 md:py-52 bg-gradient-to-br from-emerald-100 via-sky-100 to-indigo-100 dark:from-[#1f1f1f] dark:via-[#121212] dark:to-black">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold leading-tight max-w-4xl"
        >
          Discover Recipes Tailored Just for You
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl"
        >
          Our AI-powered app generates mouth-watering recipes based on your preferences, dietary needs, and available ingredients.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-8"
        >
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600"
            >
              Get Started – It’s Free!
            </Button>
          </Link>        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white dark:bg-muted/10">
        <h2 className="text-3xl font-semibold text-center mb-12">Features You'll Love</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
          {[
            {
              title: 'Smart Recommendations',
              icon: WandSparkles,
              desc: 'Get recipe suggestions based on your taste and ingredients.'
            },
            {
              title: 'Personalized Cooking',
              icon: ChefHat,
              desc: 'Tailor meals to your diet and lifestyle automatically.'
            },
            {
              title: 'Quick & Easy',
              icon: Clock,
              desc: 'No more wasting time deciding what to cook - let AI handle it.'
            },
            {
              title: 'Creative Ideas',
              icon: Lightbulb,
              desc: 'Discover unique combinations and fusion meals you’ll love.'
            }
          ].map(({ title, icon: Icon, desc }) => (
            <motion.div
              key={title}
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-white to-emerald-100 dark:from-[#1a1a1a] dark:to-[#2a2a2a] p-6 rounded-2xl shadow-lg border text-center"
            >
              <Icon className="w-10 h-10 mx-auto text-sky-600 dark:text-sky-400 mb-4" />
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-muted-foreground text-sm">{desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how" className="py-20 px-6 max-w-5xl mx-auto bg-sky-50 dark:bg-[#101820] rounded-lg">
        <h2 className="text-3xl font-semibold text-center mb-12">How It Works</h2>
        <div className="grid md:grid-cols-2 gap-10">
          {[
            {
              step: 'Sign Up Effortlessly',
              desc: 'Register using a secure magic link — no passwords needed.',
            },
            {
              step: 'Tell Us About You',
              desc: 'Select your dietary preferences and list available ingredients.',
            },
            {
              step: 'Let AI Work Its Magic',
              desc: 'Our smart system creates personalized recipe suggestions instantly.',
            },
            {
              step: 'Cook, Save & Share',
              desc: 'Get step-by-step instructions, save favorites, or share with friends.',
            },
          ].map(({ step, desc }, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="flex items-start gap-4"
            >
              <span className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-sky-500 text-white font-bold">
                {idx + 1}
              </span>
              <div>
                <h4 className="font-semibold text-lg mb-1">{step}</h4>
                <p className="text-muted-foreground text-base">{desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section id="cta" className="py-20 px-6 text-center bg-gradient-to-b from-emerald-100 to-background dark:from-[#1f1f1f] dark:to-black">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold mb-6"
        >
          Ready to Cook Smarter?
        </motion.h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands using AI to simplify their cooking journey. No more stress. Just delicious meals.
        </p>
        <Link href="/login">
          <Button
            size="lg"
            className="bg-gradient-to-r from-sky-500 to-emerald-500 text-white hover:from-sky-600 hover:to-emerald-600"
          >
            Join Now
          </Button>
        </Link>      </section>

      {/* Footer */}
      <footer className="text-center py-10 text-muted-foreground text-sm">
        © {new Date().getFullYear()} AI Recipe Generator. All rights reserved.
      </footer>
    </main>
  );
}
