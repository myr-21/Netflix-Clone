# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env` file in the root directory:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

**How to get a TMDB API key:**
1. Go to https://www.themoviedb.org/
2. Sign up for a free account
3. Navigate to Settings → API
4. Request an API key (free tier is sufficient)
5. Copy your API key to the `.env` file

### 3. Start Development Server
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar/         # Top navigation bar
│   ├── Loader/         # Netflix-style loader animation
│   ├── HeroBanner/     # Featured movie banner
│   ├── MovieRow/       # Horizontal scrolling movie rows
│   ├── MovieCard/      # Individual movie cards
│   ├── TrailerModal/   # Full-screen trailer modal
│   └── Skeleton/       # Loading skeleton components
├── pages/              # Page components
│   ├── Home.tsx        # Landing page with movie rows
│   ├── Movie.tsx       # Movie details page
│   └── Search.tsx      # Search results page
├── hooks/              # Custom React hooks
│   ├── useMovies.ts    # Movie data fetching hooks
│   ├── useSearch.ts    # Search functionality hook
│   ├── useTrailer.ts   # Trailer fetching hook
│   └── useMovieDetails.ts # Movie details hook
├── services/           # API services
│   └── tmdb.ts         # TMDB API integration
└── types/              # TypeScript type definitions
    └── index.ts
```

## ✨ Features Implemented

- ✅ Netflix-style loader animation
- ✅ Hero banner with featured movie
- ✅ Multiple horizontal scrolling movie rows
- ✅ Movie details page with trailer support
- ✅ Search functionality with debouncing
- ✅ Fully responsive design
- ✅ Dark theme throughout
- ✅ Skeleton loaders for async data
- ✅ Smooth hover effects and transitions
- ✅ Production-grade TypeScript code

## 🎨 Styling

All styling is done with Tailwind CSS - no separate CSS files or inline styles. The design follows Netflix's dark theme aesthetic.

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Notes

- The app uses real TMDB API data (no mock data)
- All components are fully typed with TypeScript
- The loader animation appears on initial load and route transitions
- Search is debounced by 500ms for optimal performance
- Movie cards scale up on hover with smooth transitions
