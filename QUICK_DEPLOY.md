# 🚀 Quick Deploy to Vercel

## Fastest Way to Deploy (3 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Deploy
```bash
vercel --prod
```

### Step 3: Add Environment Variables

After deployment completes, add your TMDB API key:

**Via Vercel CLI:**
```bash
vercel env add VITE_TMDB_API_KEY production
# Enter your TMDB API key when prompted

vercel env add VITE_TMDB_BASE_URL production
# Enter: https://api.themoviedb.org/3
```

**Via Vercel Dashboard:**
1. Go to your project on [vercel.com](https://vercel.com)
2. Settings → Environment Variables
3. Add:
   - `VITE_TMDB_API_KEY` = `your_api_key_here`
   - `VITE_TMDB_BASE_URL` = `https://api.themoviedb.org/3`

### Step 4: Redeploy
```bash
vercel --prod
```

## Done! ✅

Your Netflix Clone is now live at the URL provided by Vercel.

---

## Alternative: Deploy via GitHub

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Deploy Netflix Clone"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/netflix-clone.git
   git push -u origin main
   ```

2. **Import to Vercel:**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Select your repo
   - Add environment variables
   - Click "Deploy"

---

## Need Help?

Check `DEPLOYMENT.md` for detailed instructions and troubleshooting.
