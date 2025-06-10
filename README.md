# Frontend de Restaurante App

Este proyecto es el frontend de una aplicación web para la gestión de un restaurante, desarrollado con React y estilizado con Tailwind CSS.

## Características

- Visualización de categorías de platos
- Visualización de platos por categoría
- Detalles de platos
- Filtrado de platos por categoría
- Diseño responsive con Tailwind CSS

## Tecnologías utilizadas

- React
- React Router DOM
- Axios para consumir la API
- Tailwind CSS para estilos

## Estructura del proyecto

- `src/components`: Componentes reutilizables
- `src/pages`: Páginas de la aplicación
- `src/services`: Servicios para comunicarse con la API
- `src/assets`: Recursos estáticos

## Instalación y ejecución

1. Clonar el repositorio
2. Instalar dependencias:
   ```
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```
   npm start
   ```
4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Conexión con el backend

El frontend se comunica con el backend a través de la API REST desarrollada en Django. Asegúrate de que el backend esté en ejecución en [http://localhost:8000](http://localhost:8000) antes de utilizar el frontend.

## Construcción para producción

Para construir la aplicación para producción:

```
npm run build
```

Los archivos generados estarán en la carpeta `build/`.

## Despliegue

Para el despliegue se puede utilizar un servicio de hosting gratuito como Netlify o Vercel.
