import React, { useState, useEffect } from 'react';
import { categoriaService } from '../services/api';

const CategoriaForm = ({ categoria, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    imagen: null,
    activo: true
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (categoria) {
      setFormData({
        nombre: categoria.nombre || '',
        descripcion: categoria.descripcion || '',
        imagen: null,
        activo: categoria.activo !== undefined ? categoria.activo : true
      });
      
      if (categoria.imagen) {
        setPreviewImage(categoria.imagen.startsWith('http') ? categoria.imagen : `http://localhost:8000${categoria.imagen}`);
      }
    }
  }, [categoria]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
      
      // Crear vista previa de la imagen
      if (files[0]) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      } else {
        setPreviewImage(null);
      }
    } else if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: checked
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const formDataObj = new FormData();
      formDataObj.append('nombre', formData.nombre);
      formDataObj.append('descripcion', formData.descripcion);
      formDataObj.append('activo', formData.activo);
      
      if (formData.imagen) {
        formDataObj.append('imagen', formData.imagen);
      }
      
      let response;
      
      if (categoria && categoria.id) {
        // Actualizar categoría existente
        response = await categoriaService.update(categoria.id, formDataObj);
      } else {
        // Crear nueva categoría
        response = await categoriaService.create(formDataObj);
      }
      
      setLoading(false);
      onSave(response.data);
    } catch (err) {
      setLoading(false);
      setError('Error al guardar la categoría. Por favor intenta nuevamente.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {categoria && categoria.id ? 'Editar Categoría' : 'Nueva Categoría'}
      </h2>
      
      {error && (
        <div className="bg-red-100 text-red-800 p-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
            Nombre *
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label htmlFor="imagen" className="block text-sm font-medium text-gray-700 mb-1">
            Imagen
          </label>
          <input
            type="file"
            id="imagen"
            name="imagen"
            accept="image/*"
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {previewImage && (
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-1">Vista previa:</p>
            <div className="w-full max-w-xs h-48 relative overflow-hidden rounded-md">
              <img 
                src={previewImage} 
                alt="Vista previa" 
                className="object-cover absolute top-0 left-0 w-full h-full"
              />
            </div>
          </div>
        )}
        
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="activo"
            name="activo"
            checked={formData.activo}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="activo" className="ml-2 block text-sm text-gray-700">
            Activo
          </label>
        </div>
        
        <div className="flex space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {loading ? 'Guardando...' : 'Guardar'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoriaForm; 