import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CategoriasPage from './pages/CategoriasPage';
import CategoriaDetallePage from './pages/CategoriaDetallePage';
import PlatosPage from './pages/PlatosPage';
import PlatoDetallePage from './pages/PlatoDetallePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/categorias" element={<CategoriasPage />} />
            <Route path="/categorias/:id" element={<CategoriaDetallePage />} />
            <Route path="/platos" element={<PlatosPage />} />
            <Route path="/platos/:id" element={<PlatoDetallePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
