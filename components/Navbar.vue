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

<script>
export default {
  data() {
    return {
      userRole: null, // Aquí deberías obtener el rol del usuario desde tu sistema de autenticación
    };
  },
  computed: {
    showProducts() {
      return true; // Siempre mostrar Productos
    },
    showUnits() {
      return this.userRole === 'administrador'; // Solo mostrar para admin
    },
    showUsers() {
      return this.userRole === 'administrador'; // Solo mostrar para admin
    },
    showPurchases() {
      return this.userRole !== 'usuario'; // Mostrar para todos menos invitados
    },
    showReviews() {
      return true; // Siempre mostrar Reseñas
    },
    showOrders() {
      return this.userRole === 'administrador'; // Solo mostrar para admin
    },
  },
  mounted() {
    // Aquí deberías obtener el rol del usuario desde tu sistema de autenticación
    // Por ejemplo, podrías hacer una llamada a tu API o usar un store
    this.userRole = this.getUserRole(); // Implementa esta función según tu lógica
  },
  methods: {
    getUserRole() {
      return "usuario";
    },
  },
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>