import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categoriaService, platoService } from '../services/api';
import PlatoCard from '../components/PlatoCard';

const HomePage = () => {
  const [categorias, setCategorias] = useState([]);
  const [platosDestacados, setPlatosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriasResponse, platosDestacadosResponse] = await Promise.all([
          categoriaService.getAll(),
          platoService.getDestacados()
        ]);
        
        setCategorias(categoriasResponse.data);
        console.log('Respuesta de platos destacados:', platosDestacadosResponse);
        setPlatosDestacados(platosDestacadosResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
        console.error('Error detallado:', err);
      }
    };

    fetchData();
  }, []);

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

  return (
    <div className="container mx-auto px-4 pb-12">
      {/* Hero Section Mejorado */}
      <div className="relative bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative z-10 p-8 md:p-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">
            Descubre los Sabores de Nuestro Restaurante
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white drop-shadow-md max-w-2xl">
            Explora nuestra variedad de platos preparados con los mejores ingredientes y toda nuestra pasión por la gastronomía.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/categorias" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg text-center">
              Explorar Categorías
            </Link>
            <Link to="/platos" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-600 transition-colors shadow-lg text-center">
              Ver Todos los Platos
            </Link>
          </div>
        </div>
        <div className="h-20 bg-gradient-to-t from-white to-transparent absolute bottom-0 left-0 right-0 z-10"></div>
      </div>

      {/* Categorías con Imágenes */}
      <section className="mb-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Nuestras Categorías</h2>
          <Link to="/categorias" className="text-blue-600 hover:underline font-semibold">
            Ver todas →
          </Link>
        </div>
        
        {categorias.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-2">No hay categorías disponibles.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {categorias.slice(0, 4).map(categoria => (
              <div 
                key={categoria.id} 
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => navigate(`/categorias/${categoria.id}`)}
              >
                <div className="h-48 relative">
                  {categoria.imagen ? (
                    <img
                      src={categoria.imagen.startsWith('http') ? categoria.imagen : `https://wilderdetati1.pythonanywhere.com${categoria.imagen}`}
                      alt={categoria.nombre}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x200?text=Categoría';
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full bg-gray-200">
                      <span className="text-gray-500 font-medium">Sin imagen</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-white mb-1">{categoria.nombre}</h3>
                    <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full">
                      Ver platos
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Platos Destacados Mejorados */}
      <section>
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Platos Destacados</h2>
            <p className="text-gray-600">Nuestras recomendaciones especiales para ti</p>
          </div>
          <Link to="/platos" className="text-blue-600 hover:underline font-semibold">
            Ver todos →
          </Link>
        </div>
        
        {platosDestacados.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <p className="text-gray-600 mb-2">No hay platos destacados disponibles.</p>
            <Link to="/platos" className="text-blue-600 hover:underline">
              Ver todos los platos
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {platosDestacados.map(plato => (
              <div key={plato.id} className="transform transition-transform hover:scale-105" onClick={() => navigate(`/platos/${plato.id}`)}>
                <PlatoCard plato={plato} />
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default HomePage; 