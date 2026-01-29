# Netflix Clone UI - Production-Grade, Not a Toy

A production-ready Netflix-style streaming UI built with React, TypeScript, and Tailwind CSS. This is a fully functional frontend application that fetches real movie data from TMDB API.

## 🚀 Features

- **Netflix-style UI** with dark theme and smooth animations
- **Fully responsive** design (mobile → desktop)
- **Netflix loader animation** on initial load and route transitions
- **Hero banner** with featured movie
- **Multiple movie rows**: Trending, Popular, Top Rated, Netflix Originals
- **Movie details page** with trailer support
- **Search functionality** with debounced queries
- **Skeleton loaders** for all async data
- **Smooth hover effects** and transitions
- **Production-grade code structure** with TypeScript

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS (no CSS files, no inline styles)
- **Routing**: React Router v6
- **State Management**: React Context + Custom Hooks
- **Data Source**: TMDB API (read-only)
- **Animations**: CSS + Framer Motion (minimal, where justified)

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── Loader/
│   ├── HeroBanner/
│   ├── MovieRow/
│   ├── MovieCard/
│   ├── TrailerModal/
│   └── Skeleton/
├── pages/
│   ├── Home.tsx
│   ├── Movie.tsx
│   └── Search.tsx
├── hooks/
│   ├── useMovies.ts
│   ├── useSearch.ts
│   ├── useTrailer.ts
│   └── useMovieDetails.ts
├── services/
│   └── tmdb.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "Netflix Clone"
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Add your TMDB API key to `.env`:
```
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
```

To get a TMDB API key:
1. Visit [TMDB](https://www.themoviedb.org/)
2. Create an account
3. Go to Settings → API
4. Request an API key
5. Copy the API key to your `.env` file

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Components

### Loader
Netflix-style loader animation shown on:
- Initial app load
- Route transitions
- API fetch delays

### HeroBanner
Featured movie banner with:
- Full-width backdrop image
- Gradient overlays
- Play and More Info buttons

### MovieRow
Horizontal scrolling movie rows with:
- Left/right scroll buttons
- Smooth scrolling
- Loading states

### MovieCard
Individual movie cards with:
- Hover scale effect
- Title and rating display
- Smooth transitions

### TrailerModal
Full-screen trailer modal with:
- YouTube embed
- Keyboard navigation (ESC to close)
- Click outside to close

## 🔧 Code Quality

- Full TypeScript typing (no `any`)
- Reusable, composable components
- No duplicated logic
- Clear separation of UI vs data logic
- Production-level naming and structure

## 📄 License

This project is for educational purposes.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for the movie data API
- Netflix for the UI inspiration
