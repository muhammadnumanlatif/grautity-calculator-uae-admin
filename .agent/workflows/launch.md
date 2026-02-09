---
description: Steps for final launch readiness of Gratuity Calculator UAE
---

# // turbo-all
# Launch Readiness Workflow

Follow these steps to ensure the application is ready for production.

## 1. Automated SEO Audit
Run the SEO audit script to verify that all critical pages have proper meta tags and schema markup.
```bash
npx ts-node scripts/seo-audit.ts
```

## 2. Generate Documentation
Generate the Knowledge Items for the Admin Dashboard to ensure they have a local reference.
```bash
npx ts-node scripts/generate-docs.ts
```

## 3. Build Verification
Run the production build for both client and admin to ensure no hydration mismatches or build errors.
```bash
npm run build
```

## 4. PM2 Deployment
Deploy the applications using PM2 with the provided ecosystem config.
```bash
pm2 start ecosystem.config.js
```

## 5. Firewall & Security Check
Ensure Firestore rules and Firebase Auth are correctly configured for production.
- [ ] Firestore rules are `allow read: if true; allow write: if request.auth != null;` (or more specific)
- [ ] Firebase Auth has only the required sign-in providers.
