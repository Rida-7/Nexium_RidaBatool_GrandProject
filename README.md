# 🍽️ AI Recipe Generator Web App

An intelligent, minimal, and elegant web application that generates personalized recipes using AI. Built with **Next.js**, styled with **Tailwind CSS**, powered by **Supabase** (Auth + Database), and automated using **n8n workflows**. Deployed seamlessly on **Vercel**.

---

## 🔗 Live Demo

🌐 [View Live App](https://your-vercel-app.vercel.app)

---

## ✨ Features

- ✅ Magic Link Authentication (Supabase)
- 🍳 Generate personalized recipes via AI (n8n workflow)
- 💾 Save and view your generated recipes
- 🌗 Dark / Light theme toggle
- 📱 Fully responsive design
- 🔐 Secure user access with Supabase Auth
- ☁️ Deployed on Vercel with CI/CD

---

## 🧠 Tech Stack

| Tech         | Usage                      |
|--------------|----------------------------|
| Next.js      | Frontend framework         |
| Supabase     | Auth + Database            |
| n8n          | AI Recipe generation logic |
| Tailwind CSS | Styling and theming        |
| Vercel       | Hosting and deployment     |

---

## 📁 Project Structure

├── app/                   # Next.js app structure
│   ├── login/             # Auth page
│   ├── dashboard/         # Recipe generator page
│   ├── saved/             # Saved recipes list
├── components/            # Reusable UI components
├── lib/                   # Supabase client, helpers
├── public/                # Static assets
├── styles/                # Global styles
├── .env.local             # Environment variables
└── README.md

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/your-username/ai-recipe-generator.git
cd ai-recipe-generator

### 2. Install dependencies

npm install

### 3. Configure `.env.local`

Create a file `.env.local` and add the following:

NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_N8N_WEBHOOK_URL=https://your-n8n-url.com/webhook/ai-recipe

### 4. Run the app locally


npm run dev

Visit `http://localhost:3000` in your browser.

## 🚀 Deployment (Vercel)

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com) and import your repo.
3. Add the environment variables (same as `.env.local`) in **Project Settings → Environment Variables**.
4. Click **Deploy** and your app is live!

## 🧠 AI Logic via n8n

* Your `n8n` instance must be deployed on a public URL (e.g. `n8n.cloud`, or self-hosted on Render, Railway, or Fly.io).
* The workflow receives the ingredient list and responds with:

  * A recipe title
  * Step-by-step cooking instructions
* Make sure the webhook node is configured to **allow unauthenticated access** or uses an API key/token.

