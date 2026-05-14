# Codely Deployment

## Vercel Settings

- Framework Preset: Next.js
- Root Directory: repository root
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: leave blank

Do not set a custom output directory. This project uses the Next.js App Router and should be deployed by Vercel as a standard Next.js application.

## Required Files

- `app/layout.tsx`
- `app/page.tsx`
- `app/globals.css`
- `next.config.mjs`
- `package.json`
- `tailwind.config.ts`
- `postcss.config.js`

## Environment Variables

The temporary homepage does not require environment variables.

Future Firebase and AI features may require:

- `OPENAI_API_KEY`
- `NEXT_PUBLIC_FIREBASE_API_KEY`
- `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
- `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
- `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
- `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
- `NEXT_PUBLIC_FIREBASE_APP_ID`

## Routing

This project uses the App Router only. The homepage entry point is:

- `app/page.tsx`

There is no `pages/index.tsx`, and no `vercel.json` rewrite is required.

## Known 404 Cause To Check

If Vercel shows `404: NOT_FOUND` while the local build passes, check that the Vercel project is deploying this repository root and the `servicesetu` branch. A wrong root directory, wrong project, or wrong branch can create a deployment URL that exists but has no Next.js app entry point.
