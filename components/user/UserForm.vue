<template>
    <div class="p-6 bg-gray-800 rounded-lg">
      <h2 class="text-xl text-green-400 mb-4">{{ usuario ? 'Editar Usuario' : 'Agregar Usuario' }}</h2>
      <form @submit.prevent="submitForm" class="mb-6">
        <label class="block text-gray-400 mb-2">Nombre de Usuario:</label>
        <input 
          v-model="form.nombre_usuario" 
          type="text" 
          placeholder="Ej: Juan Perez" 
          class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
          required 
        />
        <label class="block text-gray-400 mb-2">Email:</label>
        <input 
          v-model="form.email" 
          type="email" 
          placeholder="Ej: juan@example.com" 
          class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
        />
        <label class="block text-gray-400 mb-2">Contraseña:</label>
        <input 
          v-model="form.password" 
          type="password" 
          placeholder="Contraseña" 
          class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
          required 
        />
        <label class="block text-gray-400 mb-2">Rol:</label>
        <select v-model="form.rol" class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4">
          <option value="usuario">Usuario</option>
          <option value="administrador">Administrador</option>
        </select>
        <button type="submit" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition">
          {{ usuario ? 'Actualizar' : 'Agregar' }}
        </button>
        <button @click="$emit('close')" type="button" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition ml-4">Cancelar</button>
      </form>
      <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useRuntimeConfig } from '#app'; // Importa useRuntimeConfig
  
  const props = defineProps(['usuario']);
  const emit = defineEmits(['close', 'refresh']);
  const config = useRuntimeConfig(); // Define config aquí
  
  const form = ref({
    nombre_usuario: '',
    email: '',
    password: '',
    rol: 'usuario'
  });
  const errorMessage = ref(''); // Estado para el mensaje de error
  
  // Observa los cambios en props.usuario
  watch(() => props.usuario, (newVal) => {
    if (newVal) {
      form.value.nombre_usuario = newVal.nombre_usuario;
      form.value.email = newVal.email;
      form.value.password = ''; // No mostrar la contraseña
      form.value.rol = newVal.rol;
    } else {
      form.value.nombre_usuario = '';
      form.value.email = '';
      form.value.password = '';
      form.value.rol = 'usuario';
    }
  }, { immediate: true }); // Ejecuta inmediatamente para establecer el valor inicial
  
  const submitForm = async () => {
    const method = props.usuario ? 'PUT' : 'POST';
    const id = props.usuario ? props.usuario.id : null; // Obtén el ID del usuario
  
    const url = props.usuario 
      ? `${config.public.backend_url}/CheckpointReviews/usuarios/editUsuario/${id}` 
      : `${config.public.backend_url}/CheckpointReviews/usuarios/addUsuario`;
  
    try {
      await $fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form.value)
      });
  
      emit('refresh');
      emit('close');
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      errorMessage.value = 'Hubo un error al enviar los datos. Por favor, intenta de nuevo.'; // Mostrar mensaje de error
    }
  };
  </script>