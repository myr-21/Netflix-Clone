# Netflix Clone - Vercel Deployment Guide

## Prerequisites
- A [Vercel account](https://vercel.com/signup)
- A [TMDB API key](https://www.themoviedb.org/settings/api)
- Git repository (optional but recommended)

## Deployment Steps

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add VITE_TMDB_API_KEY
   vercel env add VITE_TMDB_BASE_URL
   ```
   
   When prompted, enter:
   - `VITE_TMDB_API_KEY`: Your TMDB API key
   - `VITE_TMDB_BASE_URL`: `https://api.themoviedb.org/3`

5. **Redeploy with environment variables**
   ```bash
   vercel --prod
   ```

### Option 2: Deploy via Vercel Dashboard

1. **Push to Git**
   - Create a GitHub/GitLab/Bitbucket repository
   - Push your code:
     ```bash
     git init
     git add .
     git commit -m "Initial commit"
     git branch -M main
     git remote add origin <your-repo-url>
     git push -u origin main
     ```

2. **Import to Vercel**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "Add New Project"
   - Import your Git repository
   - Vercel will auto-detect Vite configuration

3. **Configure Environment Variables**
   - In project settings, go to "Environment Variables"
   - Add the following:
     - `VITE_TMDB_API_KEY` = Your TMDB API key
     - `VITE_TMDB_BASE_URL` = `https://api.themoviedb.org/3`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your app

### Option 3: Quick Deploy (Without Git)

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Run deployment command**
   ```bash
   vercel --prod
   ```

3. **Follow prompts** to set up the project

4. **Add environment variables via dashboard** or CLI (see Option 1)

## Environment Variables Required

Make sure to set these environment variables in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_TMDB_API_KEY` | Your API key | Get from TMDB |
| `VITE_TMDB_BASE_URL` | `https://api.themoviedb.org/3` | TMDB API base URL |

## Build Settings (Auto-detected by Vercel)

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

## Troubleshooting

### Build Fails
- Ensure all dependencies are in `package.json`
- Check TypeScript errors: `npm run build` locally
- Verify Node.js version compatibility

### Environment Variables Not Working
- Make sure variables start with `VITE_`
- Redeploy after adding variables
- Check variables are set for Production environment

### 404 on Routes
- Verify `vercel.json` includes the rewrite rule
- React Router requires all routes to serve `index.html`

### API Errors
- Verify TMDB API key is valid
- Check API key has proper permissions
- Ensure `VITE_TMDB_BASE_URL` is correct

## Post-Deployment

After successful deployment:
- Test all routes
- Verify movie data loads correctly
- Check responsive design on different devices
- Monitor performance in Vercel dashboard

## Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed
4. Vercel will automatically provision SSL

## Continuous Deployment

If using Git:
- Every push to `main` branch triggers automatic deployment
- Pull requests create preview deployments
- Configure branch deployment settings in Vercel dashboard

---

**Your Netflix Clone is now live on Vercel! 🎉**
