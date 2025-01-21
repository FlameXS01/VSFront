<template>
    <div>
      <h2 class="text-xl text-green-400 mb-4">Lista de Usuarios</h2>
      <button @click="showForm = true" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition mb-4">Agregar Usuario</button>
      <ul>
        <li v-for="usuario in usuarios" :key="usuario.id" class="flex justify-between items-center bg-gray-900 p-4 mb-2 rounded-lg">
          <span>{{ usuario.nombre_usuario }}</span>
          <div>
            <button @click="editUsuario(usuario)" class="text-blue-400 hover:underline mr-4">Editar</button>
            <button @click="deleteUsuario(usuario.id)" class="text-red-400 hover:underline">Eliminar</button>
          </div>
        </li>
      </ul>
      <UserForm v-if="showForm" :usuario="selectedUsuario" @close="showForm = false" @refresh="fetchUsuarios" />
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import UserForm from './UserForm.vue';
  const config = useRuntimeConfig();
  
  const usuarios = ref([]);
  const showForm = ref(false);
  const selectedUsuario = ref(null);
  const errorMessage = ref(''); // Estado para el mensaje de error
  
  const fetchUsuarios = async () => {
    try {
      usuarios.value = await $fetch(`${config.public.backend_url}/CheckpointReviews/usuarios`);
    } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      errorMessage.value = 'No se pudieron cargar los usuarios. Intenta de nuevo más tarde.';
    }
  };
  
  const editUsuario = (usuario) => {
    selectedUsuario.value = usuario;
    showForm.value = true;
  };
  
  const deleteUsuario = async (id) => {
    try {
      await $fetch(`${config.public.backend_url}/CheckpointReviews/usuarios/deleteUsuario/${id}`, { method: 'DELETE' });
      fetchUsuarios();
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
      errorMessage.value = 'No se pudo eliminar el usuario. Intenta de nuevo.';
    }
  };
  
  onMounted(fetchUsuarios);
  </script>