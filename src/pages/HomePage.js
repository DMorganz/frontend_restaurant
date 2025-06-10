import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriaService, platoService } from '../services/api';
import PlatoCard from '../components/PlatoCard';

const HomePage = () => {
  const [categorias, setCategorias] = useState([]);
  const [platosDestacados, setPlatosDestacados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriasResponse, platosDestacadosResponse] = await Promise.all([
          categoriaService.getAll(),
          platoService.getDestacados()
        ]);
        
        setCategorias(categoriasResponse.data);
        setPlatosDestacados(platosDestacadosResponse.data);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar los datos');
        setLoading(false);
        console.error(err);
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
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="bg-blue-600 text-white rounded-lg p-8 mb-10">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Restaurante App</h1>
        <p className="text-xl mb-6">Descubre nuestros deliciosos platos y categorías</p>
        <div className="flex space-x-4">
          <Link to="/categorias" className="bg-white text-blue-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100">
            Ver Categorías
          </Link>
          <Link to="/platos" className="bg-transparent border-2 border-white text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-700">
            Ver Platos
          </Link>
        </div>
      </div>

      {/* Categorías */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Categorías</h2>
          <Link to="/categorias" className="text-blue-600 hover:underline">Ver todas</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorias.slice(0, 4).map(categoria => (
            <div key={categoria.id} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
              <h3 className="text-lg font-bold mb-2">{categoria.nombre}</h3>
              <Link to={`/categorias/${categoria.id}`} className="text-blue-600 hover:underline">
                Ver platos
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Platos Destacados */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Platos Destacados</h2>
          <Link to="/platos" className="text-blue-600 hover:underline">Ver todos</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {platosDestacados.map(plato => (
            <PlatoCard key={plato.id} plato={plato} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage; 