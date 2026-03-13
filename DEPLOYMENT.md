# SUMO Deployment Guide

## GitHub Push

```bash
git init
git add .
git commit -m "Initial commit: SUMO app for Moni & Surya"
git branch -M main
git remote add origin https://github.com/MONIKA9360/health-project.git
git push -u origin main
```

## Vercel Deployment

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository: `MONIKA9360/health-project`
3. Configure project:
   - **Framework Preset:** Vite
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. Add Environment Variables:
   - `VITE_API_URL` = `https://your-project.vercel.app/api`
   - `DATABASE_URL` = `postgresql://neondb_owner:npg_D9SyZJlCjL4p@ep-broad-violet-anbtkzoa-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require`
   - `JWT_SECRET` = `sumo_secret_key_for_moni_and_surya_2024`
   - `PORT` = `3000`

5. Click "Deploy"

### Option 2: Deploy via Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

## Post-Deployment

1. After deployment, get your Vercel URL (e.g., `https://sumo-app.vercel.app`)
2. Update `VITE_API_URL` environment variable to: `https://your-project.vercel.app/api`
3. Redeploy to apply changes

## Access Your App

- Frontend: `https://your-project.vercel.app`
- Backend API: `https://your-project.vercel.app/api`

## Login Credentials

- Username: `sumo@gmail.com`
- Password: `sumosofa`

Made with love for Moni & Surya ❤️💙
