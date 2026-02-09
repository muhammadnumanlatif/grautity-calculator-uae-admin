# Deployment Guide: Gratuity Calculator UAE

This project is a monorepo containing two Next.js applications: **Client** and **Admin**. Both are optimized for deployment on Vercel.

## 🚀 Vercel Deployment Instructions

### 1. Deploying the Client App (`/apps/client`)
- **New Project** -> Select this repository.
- **Project Name**: `gratuity-calculator-client` (or your choice).
- **Framework Preset**: `Next.js`.
- **Root Directory**: `apps/client`.
- **Environment Variables**: Copy values from `apps/client/.env.example`.
- **Build Command**: Vercel will automatically detect the workspace and use the root's turbo cache.

### 2. Deploying the Admin App (`/apps/admin`)
- **New Project** -> Select this repository again.
- **Project Name**: `gratuity-calculator-admin`.
- **Framework Preset**: `Next.js`.
- **Root Directory**: `apps/admin`.
- **Environment Variables**: Copy values from `apps/admin/.env.example`.
  - **Note**: Ensure `FIREBASE_PRIVATE_KEY` is wrapped in quotes if it contains newlines.
- **Vercel Blob**: Enable the "Blob" storage in the Vercel dashboard for this project to get the `BLOB_READ_WRITE_TOKEN`.

## 🛠️ Monorepo Configuration Details
- **Build Tool**: Powered by [Turborepo](https://turbo.build/).
- **Shared Code**: Business logic and UI tokens are shared via `@gratuity/shared`.
- **Firebase**: Both apps share the same Firebase configuration but use different permission sets (Client = Read, Admin = Full).

## 🔒 Security Reminders
- Never commit your actual `.env` files.
- Ensure `firestore.rules` are deployed to Firebase to protect your data.
- The Admin app should only be accessible to authorized users (managed via Firebase Auth).
