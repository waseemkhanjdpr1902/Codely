# Deployment Checklist

## Repository Root

The Next.js app lives at the repository root:

```text
Codely/
  app/
  package.json
  next.config.mjs
  tailwind.config.ts
  postcss.config.js
```

There is no nested app folder such as `Codely/codely/app`.

## Vercel Project Settings

- Framework Preset: Next.js
- Production Branch: `servicesetu`
- Root Directory: leave blank or set to `.`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: leave blank

Do not set a custom output directory. Do not configure this project as a static site.

## Required Entry Points

- `package.json`
- `next.config.mjs`
- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`

## Environment Variables

The temporary deployment check page does not require environment variables.

Future app features may require:

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Local Verification

Run:

```bash
npm install
npm run build
```

The build must show a valid route for `/`.

## Current Diagnosis

The repository contains a valid App Router homepage at `app/page.tsx`, and the local production build generates `.next` successfully. If Vercel still returns platform `404: NOT_FOUND`, the Vercel project is not deploying this repository root and branch with standard Next.js settings. The most likely causes are:

- Vercel project root is not the repository root.
- Vercel production branch is not `servicesetu`.
- Vercel has a custom Output Directory configured.
- The visible URL belongs to a different Vercel project than this Git repository.
