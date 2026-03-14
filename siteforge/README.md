# SiteForge ⚡

> The easiest way for small businesses to get online.

## What is SiteForge?

SiteForge is a website builder platform for small local businesses.
Business owners can create a beautiful website in under 5 minutes
by choosing a template, filling in their details, and publishing instantly.

## Features

- 6 industry-specific templates (Barbershop, Restaurant, Nail Salon, Gym, Café, Photography)
- Real-time live preview while editing
- Google Authentication
- Firebase Firestore for data storage
- Cloudinary for image uploads
- SEO-optimized public business pages
- Mobile responsive on all pages
- Dashboard to manage and delete websites

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Firebase** (Auth + Firestore)
- **Cloudinary** (image uploads)
- **Framer Motion** (animations)
- **Zustand** (editor state)

## Environment Variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
cp .env.example .env.local
```

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push this repository to GitHub
2. Import the project in Vercel
3. Add all environment variables from `.env.example`
4. Deploy

**Important:** After deploying, go to Firebase Console → Authentication → Settings → Authorized domains and add your Vercel domain (e.g. `siteforge.vercel.app`) so Google Sign-In works in production.
