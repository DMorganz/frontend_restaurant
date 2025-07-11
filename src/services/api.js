import axios from 'axios';

const API_URL = 'https://wilderdetati1.pythonanywhere.com/api';

// Crear una instancia de Axios con configuraciones comunes
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Servicios para Categorías
export const categoriaService = {
  // Obtener todas las categorías
  getAll: () => api.get('/categorias/'),
  
  // Obtener una categoría por ID
  getById: (id) => api.get(`/categorias/${id}/`),
  
  // Crear una nueva categoría
  create: (data) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return api.post('/categorias/', data, { headers });
  },
  
  // Actualizar una categoría existente
  update: (id, data) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return api.put(`/categorias/${id}/`, data, { headers });
  },
  
  // Eliminar una categoría
  delete: (id) => api.delete(`/categorias/${id}/`),
  
  getPlatos: (id) => api.get(`/categorias/${id}/platos/`),
};

// Servicios para Platos
export const platoService = {
  // Obtener todos los platos
  getAll: () => api.get('/platos/'),
  
  // Obtener platos destacados - si el endpoint específico no funciona, obtenemos todos y filtramos
  getDestacados: async () => {
    try {
      // Intenta obtener los destacados usando el endpoint específico
      return await api.get('/platos/destacados/');
    } catch (error) {
      // Si falla, obtiene todos los platos y filtra los destacados
      console.log('Fallback: Obteniendo todos los platos y filtrando destacados');
      const response = await api.get('/platos/');
      const platosDestacados = response.data.filter(plato => plato.destacado === true);
      return { data: platosDestacados };
    }
  },
  
  // Obtener platos por categoría
  getPorCategoria: (categoriaId) => api.get(`/platos/por_categoria/?categoria_id=${categoriaId}`),
  
  // Obtener un plato por ID
  getById: (id) => api.get(`/platos/${id}/`),
  
  // Crear un nuevo plato
  create: (data) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return api.post('/platos/', data, { headers });
  },
  
  // Actualizar un plato existente
  update: (id, data) => {
    const headers = { 'Content-Type': 'multipart/form-data' };
    return api.put(`/platos/${id}/`, data, { headers });
  },
  
  // Eliminar un plato
  delete: (id) => api.delete(`/platos/${id}/`)
};

export default api; 