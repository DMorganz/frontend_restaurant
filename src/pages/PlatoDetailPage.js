import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { platoService } from '../services/api';

const PlatoDetailPage = () => {
  const { id } = useParams();
  const [plato, setPlato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlato = async () => {
      try {
        setLoading(true);
        const response = await platoService.getById(id);
        setPlato(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar el plato');
        setLoading(false);
        console.error(err);
      }
    };

    fetchPlato();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-gray-500">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-red-500">{error}</div>
      </div>
    );
  }

  if (!plato) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-red-500">Plato no encontrado</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/platos" className="text-blue-600 hover:underline">
          &larr; Volver a platos
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            {plato.imagen ? (
              <img 
                src={`http://localhost:8000${plato.imagen}`} 
                alt={plato.nombre} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full min-h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
          </div>
          <div className="p-6 md:w-1/2">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold">{plato.nombre}</h1>
              <span className="bg-green-100 text-green-800 text-lg font-medium px-3 py-1 rounded">
                S/ {plato.precio}
              </span>
            </div>
            
            <div className="mb-6">
              <Link 
                to={`/categorias/${plato.categoria.id}`} 
                className="text-blue-600 hover:underline"
              >
                Categoría: {plato.categoria.nombre}
              </Link>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Descripción</h2>
              <p className="text-gray-700">{plato.descripcion}</p>
            </div>
            
            <div className="flex space-x-4 mb-6">
              {plato.disponible ? (
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Disponible
                </span>
              ) : (
                <span className="bg-red-100 text-red-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  No disponible
                </span>
              )}
              
              {plato.destacado && (
                <span className="bg-yellow-100 text-yellow-800 text-sm font-medium px-2.5 py-0.5 rounded">
                  Destacado
                </span>
              )}
            </div>
            
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors w-full">
              Ordenar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatoDetailPage; 