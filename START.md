# How to Start the Site

## Quick Start

1. **Open a terminal** in the project folder:
   ```
   c:\Users\mayur\Downloads\Netflix Clone
   ```

2. **Run the dev server**:
   ```bash
   npm run dev
   ```

3. **Open your browser** and go to:
   ```
   http://localhost:5173
   ```

## What You Should See

- The dev server will start and show:
  ```
  VITE v5.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ```

- Your browser should open automatically, or you can manually navigate to `http://localhost:5173`

## If It Still Doesn't Load

1. **Check the terminal** - Are there any error messages?
2. **Check the browser console** (F12 → Console tab) - Any JavaScript errors?
3. **Try a different browser** - Sometimes browser cache can cause issues
4. **Clear browser cache** - Ctrl+Shift+Delete
5. **Try incognito/private mode**

## Common Issues

### Port Already in Use
If port 5173 is busy, Vite will automatically use the next available port (5174, 5175, etc.). Check the terminal output for the actual URL.

### API Errors
If you see API errors, check:
- Your `.env` file has the correct API key
- You restarted the dev server after changing `.env`
- The API key is valid (32 character hex string)

### Blank Screen
- Check browser console (F12)
- Check terminal for build errors
- Make sure all dependencies are installed: `npm install`
