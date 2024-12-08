<template>
    <div class="bg-gray-900 text-white">
      <!-- Header -->
      <header class="bg-gray-900 p-4 text-center">
        <h1 class="text-3xl text-green-400 uppercase">Checkpoint Reviews</h1>
      </header>
  
      <!-- Hero Section -->
      <main>
        <section class="bg-gray-800 text-center py-20">
          <h2 class="text-4xl text-orange-500 mb-4">¡Bienvenido a Checkpoint Reviews!</h2>
          <p class="text-lg text-gray-400 mb-6">Tu fuente definitiva para reseñas y novedades de videojuegos.</p>
          <button class="bg-green-400 text-white py-2 px-8 rounded-lg hover:bg-green-500 transition">
            Leer Reseñas
          </button>
        </section>
  
        <!-- Content Section -->
        <section class="flex justify-center mt-16">
          <div class="bg-gray-800 p-6 m-4 rounded-lg max-w-xs text-center">
            <h3 class="text-2xl text-orange-500 mb-4">Última Reseña</h3>
            <p class="text-gray-400 mb-4">Descubre nuestra última reseña sobre el juego más popular de la temporada.</p>
            <button class="bg-orange-500 text-white py-2 px-8 rounded-lg hover:bg-orange-600 transition">
              Leer Más
            </button>
          </div>
        </section>
      </main>
  
      <!-- Footer -->
      <footer class="bg-gray-900 p-4 text-center text-gray-400">
        <p>© 2024 Checkpoint Reviews. Todos los derechos reservados.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    head() {
      return {
        title: 'Checkpoint Reviews - Reseñas y Novedades de Videojuegos',
        meta: [
          { name: 'description', content: 'Últimas reseñas y noticias sobre videojuegos.' }
        ]
      }
    }
  }
  </script>
  
  <style scoped>
  /* Las clases de Tailwind CSS ya se aplican directamente en el template */
  </style>
  