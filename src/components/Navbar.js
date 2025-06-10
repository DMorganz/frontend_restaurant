import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              Restaurante App
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link to="/" className="hover:text-gray-300">
              Inicio
            </Link>
            <Link to="/categorias" className="hover:text-gray-300">
              Categorías
            </Link>
            <Link to="/platos" className="hover:text-gray-300">
              Platos
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 