# Codely

Codely helps non-coders build simple apps, tools, and websites with AI.

Positioning: **Build simple apps and tools with AI, without coding.**

## What is included

- Next.js App Router application
- Non-coder landing page
- AI builder workspace with:
  - App Builder
  - Code Generator
  - Error Fixer
  - UI Enhancer
  - Prompt to App
- Tool categories for landing pages, calculators, forms, dashboards, business websites, document tools, error fixing, and code explaining
- Firebase-aware authentication with local launch mode fallback
- Local-storage dashboard and project manager
- Razorpay-aware pricing and payment API routes
- Vercel deployment guide and environment example

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Verification

```bash
npm run lint
npm run build
```

## Environment variables

Copy `.env.example` to `.env.local` for local development. Add the same values in Vercel for production.

### AI providers

The frontend never calls external AI APIs directly. It calls `/api/generate`; the server route tries providers in this order:

1. Gemini
2. OpenAI
3. Groq

```bash
GEMINI_API_KEY=
OPENAI_API_KEY=
GROQ_API_KEY=
```

If no AI key is configured, users see:

> AI service is not configured yet. Please add API key in Vercel.

### Firebase Auth

Firebase Auth enables production signup, login, Google login, logout, and session persistence.

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

If Firebase is not configured, Codely uses local launch mode so the dashboard and builder can still be tested.

### Razorpay

Razorpay checkout uses server-side order creation and server-side payment verification.

```bash
NEXT_PUBLIC_RAZORPAY_KEY_ID=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
```

Never expose `RAZORPAY_KEY_SECRET` in frontend code.

If Razorpay is not configured, users see:

> Payment is not configured yet.

## Vercel deployment

Use these settings:

- Framework Preset: Next.js
- Root Directory: repository root
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave blank

Add all required environment variables in Vercel Project Settings before launching.

## Current persistence model

Projects, usage, and selected plan are stored in browser local storage first. The data model is intentionally simple and can be moved to Firebase Firestore or Supabase later.
