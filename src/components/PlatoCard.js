import React from 'react';

const PlatoCard = ({ plato }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="h-48 relative">
        {plato.imagen ? (
          <img
            src={plato.imagen.startsWith('http') ? plato.imagen : `https://wilderdetati1.pythonanywhere.com${plato.imagen}`}
            alt={plato.nombre}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              console.error("Error cargando imagen:", plato.imagen);
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/300x200?text=Sin+imagen';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-200">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-1">{plato.nombre}</h3>
        {plato.categoria_nombre && (
          <p className="text-sm text-blue-600 mb-2">{plato.categoria_nombre}</p>
        )}
        <p className="text-lg font-bold text-blue-600 mb-2">
          ${parseFloat(plato.precio).toFixed(2)}
        </p>
        {plato.descripcion && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{plato.descripcion}</p>
        )}
        <div className="flex flex-wrap gap-1">
          {plato.destacado && (
            <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs">
              Destacado
            </span>
          )}
          {!plato.disponible && (
            <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs">
              No disponible
            </span>
          )}
        </div>
        <button 
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Ver detalle
        </button>
      </div>
    </div>
  );
};

export default PlatoCard; 