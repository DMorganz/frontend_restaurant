import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { platoService } from '../services/api';
import PlatoCard from '../components/PlatoCard';
import PlatoForm from '../components/PlatoForm';
import ConfirmDialog from '../components/ConfirmDialog';

const PlatosPage = () => {
  const [platos, setPlatos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentPlato, setCurrentPlato] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [platoToDelete, setPlatoToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPlatos();
  }, []);

  const fetchPlatos = async () => {
    try {
      setLoading(true);
      const response = await platoService.getAll();
      setPlatos(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar platos:', err);
      setError('Error al cargar los platos. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCurrentPlato(null);
    setShowForm(true);
  };

  const handleEditClick = (plato) => {
    setCurrentPlato(plato);
    setShowForm(true);
  };

  const handleDeleteClick = (plato) => {
    setPlatoToDelete(plato);
    setShowConfirmDialog(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentPlato(null);
  };

  const handleFormSave = async (savedPlato) => {
    setShowForm(false);
    await fetchPlatos();
  };

  const handleDeleteConfirm = async () => {
    try {
      await platoService.delete(platoToDelete.id);
      setShowConfirmDialog(false);
      setPlatoToDelete(null);
      await fetchPlatos();
    } catch (err) {
      console.error('Error al eliminar plato:', err);
      setError('Error al eliminar el plato. Por favor, intenta nuevamente.');
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
    setPlatoToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Platos</h1>
        <button
          onClick={handleCreateClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Nuevo Plato
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center py-8">Cargando platos...</p>
      ) : platos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No hay platos disponibles.</p>
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Crear primer plato
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {platos.map((plato) => (
            <div key={plato.id} className="relative">
              <div className="block cursor-pointer" onClick={() => navigate(`/platos/${plato.id}`)}>
                <PlatoCard plato={plato} />
              </div>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEditClick(plato);
                  }}
                  className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                  title="Editar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleDeleteClick(plato);
                  }}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                  title="Eliminar"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl w-full">
            <PlatoForm
              plato={currentPlato}
              onSave={handleFormSave}
              onCancel={handleFormCancel}
            />
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Eliminar Plato"
        message={`¿Estás seguro que deseas eliminar el plato "${platoToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default PlatosPage; 