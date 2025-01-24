<template>
  <header class="bg-red-800">
    <!-- Logo y Nombre -->
    <div class="flex items-center justify-between p-4">
      <div class="flex items-center space-x-4">
        <!-- Logo optimizado con NuxtImage -->
        <NuxtImg
          src="../public/images/logo.png"
          format="webp"
          alt="RT Virtual shop logo"
          width="100"
          height="48"
          class="rounded-md"
        />
        <h1 class="text-4xl text-white font-bold">RT Virtual</h1>
      </div>
      <div class="flex items-center space-x-4">
        <!-- Botón de cerrar sesión -->
        <button
          v-if="isAuthenticated"
          @click="handleSignOut"
          class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
    <Navbar />
  </header>
</template>

<script setup>
import Navbar from './Navbar.vue'; 
import { ref, computed } from 'vue';
const { signOut, status, data } = useAuth();

const isOpen = ref(false);

// Computed property para verificar si está autenticado
const isAuthenticated = computed(() => status.value === 'authenticated');


const handleSignOut = async () => {
  try {
    isOpen.value = false;
    await signOut({
      callbackUrl: '/login'
    });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    window.location.href = '/login';
  }
};

</script>