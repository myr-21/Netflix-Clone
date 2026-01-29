# Troubleshooting Guide

## Site Not Loading

### 1. Check if Dev Server is Running
```bash
npm run dev
```
You should see output like:
```
  VITE v5.0.8  ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

### 2. Check Browser Console
Open your browser's developer tools (F12) and check the Console tab for errors.

### 3. Common Issues

#### API Key Error
**Problem:** The API key format is incorrect (looks like RapidAPI key instead of TMDB key)

**Solution:** 
1. Get a proper TMDB API key:
   - Go to https://www.themoviedb.org/
   - Sign up/login
   - Settings → API → Request API Key
   - Copy the key (it should be a long alphanumeric string, NOT containing "msh" or "jsn")

2. Update `.env` file:
   ```
   VITE_TMDB_API_KEY=your_proper_tmdb_api_key_here
   VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
   ```

3. Restart the dev server after changing `.env`

#### Port Already in Use
**Problem:** Port 5173 is already in use

**Solution:**
```bash
# Kill the process using port 5173 (Windows)
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or use a different port
npm run dev -- --port 3000
```

#### Module Not Found Errors
**Problem:** Import paths not resolving

**Solution:**
1. Make sure `vite.config.ts` has the alias configured correctly
2. Restart the dev server
3. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules
   npm install
   ```

#### Blank Screen
**Problem:** App loads but shows blank screen

**Solution:**
1. Check browser console for React errors
2. Check Network tab for failed API requests
3. Verify `.env` file exists and has correct API key
4. Make sure all dependencies are installed:
   ```bash
   npm install
   ```

### 4. Verify Installation

Check if all dependencies are installed:
```bash
npm list react react-dom react-router-dom
```

If any are missing:
```bash
npm install
```

### 5. Clear Cache and Rebuild

```bash
# Clear node_modules
rm -rf node_modules

# Clear npm cache
npm cache clean --force

# Reinstall
npm install

# Restart dev server
npm run dev
```

## Still Not Working?

1. Check the browser console (F12 → Console tab)
2. Check the terminal where `npm run dev` is running for errors
3. Verify your `.env` file exists and has the correct format
4. Make sure you're accessing `http://localhost:5173` (or the port shown in terminal)
