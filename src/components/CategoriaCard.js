import React from 'react';

const CategoriaCard = ({ categoria }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <div className="h-48 relative">
        {categoria.imagen ? (
          <img
            src={categoria.imagen.startsWith('http') ? categoria.imagen : `https://wilderdetati1.pythonanywhere.com${categoria.imagen}`}
            alt={categoria.nombre}
            className="absolute top-0 left-0 w-full h-full object-cover"
            onError={(e) => {
              console.error("Error cargando imagen:", categoria.imagen);
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
        <h3 className="text-xl font-semibold mb-2">{categoria.nombre}</h3>
        {categoria.descripcion && (
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{categoria.descripcion}</p>
        )}
        {!categoria.activo && (
          <p className="bg-yellow-100 text-yellow-800 px-2.5 py-0.5 rounded-full text-xs inline-block mb-2">
            Inactiva
          </p>
        )}
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 inline-block">
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default CategoriaCard; 