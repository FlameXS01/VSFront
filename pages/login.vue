<template>
  <div class="login-container"> <!-- Aplica la clase aquí -->
    <div class="container mx-auto p-6 flex flex-col items-center">
      <h1 class="text-3xl font-bold mb-6 text-red-600">Iniciar Sesión</h1>
      <form @submit.prevent="login" class="w-full max-w-sm">
        <!-- Campo para el Nombre de Usuario -->
        <label class="block mb-2 text-white">Nombre de Usuario</label>
        <input 
          v-model="nombre_usuario" 
          type="text" 
          required 
          class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
          placeholder="Ingresa tu usuario"
        />
        
        <!-- Campo para la Contraseña -->
        <label class="block mb-2 text-white">Contraseña</label>
        <input 
          v-model="password" 
          type="password" 
          required 
          class="p-3 border border-red-500 rounded-lg w-full mb-4 text-black placeholder-gray-400" 
          placeholder="Ingresa tu contraseña"
        />
        
        <!-- Botón de Inicio de Sesión -->
        <button type="submit" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition duration-200">
          Iniciar Sesión
        </button>
      </form>
      <!-- Mostrar Errores -->
      <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { definePageMeta } from '#imports';
import { useRuntimeConfig } from '#app';

const { signIn } = useAuth();

const nombre_usuario = ref('');
const password = ref('');
const error = ref('');
const config = useRuntimeConfig();

const login = async () => {
  try {
    const response = await signIn(
      { email: nombre_usuario.value, password: password.value },
      { callbackUrl: "/", redirect: true }
    );
  } catch (err) {
    console.error('Error durante el inicio de sesión:', err); // Muestra el error completo
    error.value = err?.response?.data?.message || 'Credenciales inválidas. Por favor, verifica tus datos.';
  }
};

// Metadatos de la página para manejar autenticación
definePageMeta({
  auth: {
    unauthenticatedOnly: true, // Permitir solo a usuarios no autenticados
    navigateAuthenticatedTo: '/', // Redirigir si ya están autenticados
  },
});
</script>

<style scoped>
.login-container {
  background-image: url('~/assets/images/background_image.jpg'); /* Asegúrate de que la ruta sea correcta */
  background-size: cover; /* Asegura que la imagen cubra todo el contenedor */
  background-position: center; /* Centra la imagen */
  height: 73vh; /* Altura del componente */
  width: 100%; /* Ancho del componente */
  display: flex; /* Usar flexbox para centrar el contenido */
  justify-content: center; /* Centrar horizontalmente */
  align-items: center; /* Centrar verticalmente */
  overflow: hidden; /* Evitar scroll */
}
</style>