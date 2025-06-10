import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { categoriaService } from '../services/api';
import PlatoCard from '../components/PlatoCard';

const CategoriaDetailPage = () => {
  const { id } = useParams();
  const [categoria, setCategoria] = useState(null);
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriaYPlatos = async () => {
      try {
        setLoading(true);
        const [categoriaResponse, platosResponse] = await Promise.all([
          categoriaService.getById(id),
          categoriaService.getPlatos(id)
        ]);
        
        setCategoria(categoriaResponse.data);
        setPlatos(platosResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos de la categoría');
        setLoading(false);
        console.error(err);
      }
    };

    fetchCategoriaYPlatos();
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

  if (!categoria) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl font-bold text-red-500">Categoría no encontrada</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/categorias" className="text-blue-600 hover:underline">
          &larr; Volver a categorías
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-4 md:mb-0">
            {categoria.imagen ? (
              <img 
                src={`https://wilderdetati1.pythonanywhere.com${categoria.imagen}`} 
                alt={categoria.nombre} 
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Sin imagen</span>
              </div>
            )}
          </div>
          <div className="md:w-2/3 md:pl-8">
            <h1 className="text-3xl font-bold mb-4">{categoria.nombre}</h1>
            <p className="text-gray-700 mb-4">
              {categoria.descripcion || 'Sin descripción'}
            </p>
            <div className="flex items-center">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${categoria.activo ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>{categoria.activo ? 'Activa' : 'Inactiva'}</span>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-6">Platos en esta categoría</h2>
      
      {platos.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          No hay platos disponibles en esta categoría
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {platos.map(plato => (
            <PlatoCard key={plato.id} plato={plato} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriaDetailPage; 