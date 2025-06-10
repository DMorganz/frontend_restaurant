import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categoriaService } from '../services/api';
import CategoriaCard from '../components/CategoriaCard';
import CategoriaForm from '../components/CategoriaForm';
import ConfirmDialog from '../components/ConfirmDialog';
import ModalContainer from '../components/ModalContainer';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentCategoria, setCurrentCategoria] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [categoriaToDelete, setCategoriaToDelete] = useState(null);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const response = await categoriaService.getAll();
      setCategorias(response.data);
      setError(null);
    } catch (err) {
      console.error('Error al cargar categorías:', err);
      setError('Error al cargar las categorías. Por favor, intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateClick = () => {
    setCurrentCategoria(null);
    setShowForm(true);
  };

  const handleEditClick = (categoria) => {
    setCurrentCategoria(categoria);
    setShowForm(true);
  };

  const handleDeleteClick = (categoria) => {
    setCategoriaToDelete(categoria);
    setShowConfirmDialog(true);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setCurrentCategoria(null);
  };

  const handleFormSave = async (savedCategoria) => {
    setShowForm(false);
    await fetchCategorias();
  };

  const handleDeleteConfirm = async () => {
    try {
      await categoriaService.delete(categoriaToDelete.id);
      setShowConfirmDialog(false);
      setCategoriaToDelete(null);
      await fetchCategorias();
    } catch (err) {
      console.error('Error al eliminar categoría:', err);
      setError('Error al eliminar la categoría. Por favor, intenta nuevamente.');
    }
  };

  const handleDeleteCancel = () => {
    setShowConfirmDialog(false);
    setCategoriaToDelete(null);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Categorías</h1>
        <button
          onClick={handleCreateClick}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Nueva Categoría
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center py-8">Cargando categorías...</p>
      ) : categorias.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">No hay categorías disponibles.</p>
          <button
            onClick={handleCreateClick}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Crear primera categoría
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categorias.map((categoria) => (
            <div key={categoria.id} className="relative">
              <Link to={`/categorias/${categoria.id}`} className="block">
                <CategoriaCard categoria={categoria} />
              </Link>
              <div className="absolute top-2 right-2 flex space-x-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleEditClick(categoria);
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
                    handleDeleteClick(categoria);
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

      <ModalContainer 
        isOpen={showForm} 
        onClose={handleFormCancel}
        title={currentCategoria ? "Editar Categoría" : "Nueva Categoría"}
      >
        <CategoriaForm
          categoria={currentCategoria}
          onSave={handleFormSave}
          onCancel={handleFormCancel}
        />
      </ModalContainer>

      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Eliminar Categoría"
        message={`¿Estás seguro que deseas eliminar la categoría "${categoriaToDelete?.nombre}"? Esta acción no se puede deshacer.`}
        confirmText="Eliminar"
        cancelText="Cancelar"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  );
};

export default CategoriasPage; 