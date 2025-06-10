import React, { useState, useEffect } from 'react';
import { platoService, categoriaService } from '../services/api';

const PlatoForm = ({ plato, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imagen: null,
    destacado: false,
    disponible: true,
    categoria: ''
  });
  const [categorias, setCategorias] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await categoriaService.getAll();
        setCategorias(response.data);
      } catch (err) {
        console.error('Error al cargar categorías:', err);
        setError('No se pudieron cargar las categorías.');
      }
    };

    fetchCategorias();
  }, []);

  useEffect(() => {
    if (plato) {
      // Asegurarse de que categoria sea siempre un ID, no un objeto
      const categoriaId = typeof plato.categoria === 'object' ? plato.categoria.id : plato.categoria;
      
      setFormData({
        nombre: plato.nombre || '',
        descripcion: plato.descripcion || '',
        precio: plato.precio || '',
        imagen: null,
        destacado: plato.destacado || false,
        disponible: plato.disponible !== undefined ? plato.disponible : true,
        categoria: categoriaId || ''
      });
      
      if (plato.imagen) {
        setPreviewImage(plato.imagen.startsWith('http') ? plato.imagen : `https://wilderdetati1.pythonanywhere.com${plato.imagen}`);
      }
    }
  }, [plato]);

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
    } else if (name === 'precio') {
      // Validar que sea un número
      const regex = /^\d*\.?\d*$/;
      if (value === '' || regex.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
      }
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
      formDataObj.append('precio', formData.precio);
      formDataObj.append('destacado', formData.destacado);
      formDataObj.append('disponible', formData.disponible);
      formDataObj.append('categoria', formData.categoria);
      
      if (formData.imagen) {
        formDataObj.append('imagen', formData.imagen);
      }
      
      let response;
      
      if (plato && plato.id) {
        // Actualizar plato existente
        response = await platoService.update(plato.id, formDataObj);
      } else {
        // Crear nuevo plato
        response = await platoService.create(formDataObj);
      }
      
      setLoading(false);
      onSave(response.data);
    } catch (err) {
      setLoading(false);
      setError('Error al guardar el plato. Por favor intenta nuevamente.');
      console.error(err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">
        {plato && plato.id ? 'Editar Plato' : 'Nuevo Plato'}
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
          <label htmlFor="precio" className="block text-sm font-medium text-gray-700 mb-1">
            Precio *
          </label>
          <input
            type="text"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
            placeholder="0.00"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría *
          </label>
          <select
            id="categoria"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
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
        
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="destacado"
            name="destacado"
            checked={formData.destacado}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="destacado" className="ml-2 block text-sm text-gray-700">
            Destacado
          </label>
        </div>
        
        <div className="mb-6 flex items-center">
          <input
            type="checkbox"
            id="disponible"
            name="disponible"
            checked={formData.disponible}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="disponible" className="ml-2 block text-sm text-gray-700">
            Disponible
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

export default PlatoForm; 