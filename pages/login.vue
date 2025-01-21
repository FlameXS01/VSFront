<template>
  <div class="container mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Iniciar Sesión</h1>
    <form @submit.prevent="login">
      <!-- Campo para el Nombre de Usuario -->
      <label class="block mb-2">Nombre de Usuario</label>
      <input 
        v-model="nombre_usuario" 
        type="text" 
        required 
        class="p-2 border rounded-lg w-full mb-4 text-black" 
        placeholder="Ingresa tu usuario"
      />
      
      <!-- Campo para la Contraseña -->
      <label class="block mb-2">Contraseña</label>
      <input 
        v-model="password" 
        type="password" 
        required 
        class="p-2 border rounded-lg w-full mb-4 text-black" 
        placeholder="Ingresa tu contraseña"
      />
      
      <!-- Botón de Inicio de Sesión -->
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Iniciar Sesión
      </button>
    </form>
    <!-- Mostrar Errores -->
    <p v-if="error" class="text-red-500 mt-4">{{ error }}</p>
  </div>
</template>

<script setup>

import { ref } from 'vue';
import { definePageMeta } from '#imports';
import { useRuntimeConfig } from '#app';

const {signIn, token} = useAuth();

const nombre_usuario = ref('');
const password = ref('');
const error = ref('');
const config = useRuntimeConfig();


const login = async () => {
  console.log("a ver q vergas hay aqui " )
  try {

    await signIn({email: nombre_usuario.value, password: password.value},
                  {callbackUrl: "/", redirect: true})
    
  } catch (err) {
    // Manejo de errores
    error.value = err?.data?.message || 'Credenciales inválidas. Por favor, verifica tus datos.';
    console.error('Error durante el inicio de sesión:', err);
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
