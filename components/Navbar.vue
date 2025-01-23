<template>
  <nav class="bg-red-800 p-4">
    <ul class="flex justify-center space-x-6">
      <li v-if="showProducts">
        <NuxtLink to="/" class="text-white hover:underline">Productos</NuxtLink>
      </li>
      <li v-if="showUnits">
        <NuxtLink to="/units" class="text-white hover:underline">Unidades</NuxtLink>
      </li>
      <li v-if="showUsers">
        <NuxtLink to="/users" class="text-white hover:underline">Usuarios</NuxtLink>
      </li>
      <li v-if="showPurchases">
        <NuxtLink to="/purchases" class="text-white hover:underline">Compras</NuxtLink>
      </li>
      <li v-if="showReviews">
        <NuxtLink to="/reviews" class="text-white hover:underline">Reseñas</NuxtLink>
      </li>
      <li v-if="showOrders">
        <NuxtLink to="/orders" class="text-white hover:underline">Pedidos</NuxtLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';
const { data } = useAuth();

const userRole = computed(() => data.value?.rol); // Computed property para obtener el rol del usuario

const showProducts = true; // Siempre mostrar Productos
const showUnits = computed(() => userRole.value === 'administrador'); // Solo mostrar para admin
const showUsers = computed(() => userRole.value === 'administrador'); // Solo mostrar para admin
const showPurchases = computed(() => userRole.value === 'usuario'); // Mostrar para usuarios
const showReviews = true; // Siempre mostrar Reseñas
const showOrders = computed(() => userRole.value === 'administrador'); // Solo mostrar para admin
</script>