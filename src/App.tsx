// Netflix Clone UI, Production-Grade, Not a Toy
// Main App Component

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Movie from '@/pages/Movie';
import Search from '@/pages/Search';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-netflix-black">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
