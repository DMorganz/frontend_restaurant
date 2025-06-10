import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { platoService } from '../services/api';
import PlatoForm from '../components/PlatoForm';
import ConfirmDialog from '../components/ConfirmDialog';
import ModalContainer from '../components/ModalContainer';

const PlatoDetallePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plato, setPlato] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  useEffect(() => {
    fetchPlato();
  }, [id]);

  const fetchPlato = async () => {
    try {
      setLoading(true);
      const response = await platoService.getById(id);
      setPlato(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar plato:', err);
      setError('Error al cargar el plato. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setShowForm(true);
  };

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
  };

  const handleFormSave = async (savedPlato) => {
    setShowForm(false);
    await fetchPlato();
  };

  const handleDeleteConfirm = async () => {
    try {
      await platoService.delete(id);
      navigate('/platos');
    } catch (err) {
      console.error('Error al eliminar plato:', err);
      setError('Error al eliminar el plato. Por favor, intenta nuevamente.');
      setShowConfirmDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg">Cargando datos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate('/platos')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Volver a Platos
        </button>
      </div>
    );
  }

  if (!plato) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-lg text-red-600 mb-4">Plato no encontrado</p>
        <Link
          to="/platos"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Volver a Platos
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link
          to={plato.categoria ? (typeof plato.categoria === 'object' ? `/categorias/${plato.categoria.id}` : `/categorias/${plato.categoria}`) : '/platos'}
          className="text-blue-600 hover:underline flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {plato.categoria_nombre ? `Volver a ${plato.categoria_nombre}` : 'Volver a Platos'}
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          {plato.imagen && (
            <div className="md:w-1/2">
              <div className="h-80 relative overflow-hidden rounded-lg">
                <img
                  src={plato.imagen.startsWith('http') ? plato.imagen : `https://wilderdetati1.pythonanywhere.com${plato.imagen}`}
                  alt={plato.nombre}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                  onError={(e) => {
                    console.error("Error cargando imagen:", plato.imagen);
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/500x400?text=Sin+imagen';
                  }}
                />
              </div>
            </div>
          )}
          <div className={plato.imagen ? "md:w-1/2 p-6" : "w-full p-6"}>
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold mb-2">{plato.nombre}</h1>
              <div className="flex space-x-2">
                <button
                  onClick={handleEditClick}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={handleDeleteClick}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {plato.categoria_nombre && (
              <Link 
                to={typeof plato.categoria === 'object' ? `/categorias/${plato.categoria.id}` : `/categorias/${plato.categoria}`} 
                className="text-blue-600 hover:underline mb-2 block"
              >
                {plato.categoria_nombre}
              </Link>
            )}

            <div className="text-2xl font-bold text-blue-600 mb-4">
              ${parseFloat(plato.precio).toFixed(2)}
            </div>

            {plato.descripcion && (
              <p className="text-gray-700 mb-6">{plato.descripcion}</p>
            )}

            <div className="flex flex-wrap gap-2 mb-4">
              {plato.destacado && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                  Destacado
                </span>
              )}
              {!plato.disponible && (
                <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
                  No disponible
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <ModalContainer 
        isOpen={showForm} 
        onClose={handleFormCancel}
        title="Editar Plato"
      >
        <PlatoForm
          plato={plato}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      </ModalContainer>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Eliminar Plato"
        message={`¿Estás seguro que deseas eliminar el plato "${plato?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default PlatoDetallePage; 