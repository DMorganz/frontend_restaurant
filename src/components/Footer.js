import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Restaurante App</h3>
            <p className="text-gray-300 text-sm">La mejor comida a tu alcance</p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-300 text-sm">© {new Date().getFullYear()} Restaurante App</p>
            <p className="text-gray-300 text-sm">Todos los derechos reservados</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 