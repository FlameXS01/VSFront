<template>
  <div class="max-h-screen overflow-y-auto p-6">
    <form @submit.prevent="submitForm" class="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 class="text-2xl font-bold mb-4 text-center">{{ user ? 'Editar Usuario' : 'Agregar Usuario' }}</h2>
      
      <label class="block mb-2">Nombre del Usuario</label>
      <input v-model="form.username" type="text" required class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa su nombre completo" style="color: black;" />
      
      <label class="block mb-2">Correo de contacto</label>
      <input v-model="form.email" type="email" required class="p-2 border rounded-lg w-full mb-4" placeholder="example@gmail.com" style="color: black;" />
      
      <label class="block mb-2">Número de Télefono</label>
      <input v-model="form.phone_number" type="text" class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa el número de télefono" style="color: black;" />

      <label class="block mb-2">Rol</label>
      <select v-model="form.rol" class="p-2 border rounded-lg w-full mb-4">
        <option v-for="role in roles" :key="role.value" :value="role.value">
          {{ role.name }}
        </option>
      </select>
      
      <label class="block mb-2">URL de Imagen</label>
      <input v-model="form.url_imagen" type="text" class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa la URL de la imagen" style="color: black;" />

      <button type="submit" class="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition w-full">
        {{ user ? 'Actualizar Usuario' : 'Agregar Usuario' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue';

const props = defineProps({ user: Object });
const emit = defineEmits(['close', 'refresh']);
const config = useRuntimeConfig();

const form = ref({
  username: '',
  phone_number: '',
  email: '',
  rol: '',
  url_imagen: '',
});

// Lista de roles
const roles = ref([]);

// Función para obtener los roles
const getRoles = () => {
  if (status.value === 'authenticated' && data.value?.rol === 'administrador') {
    return [
      { id: 1, name: 'Usuario', value: 'usuario' },
      { id: 2, name: 'Administrador', value: 'administrador' },
    ];
  } else {
    return [
      { id: 1, name: 'Usuario', value: 'usuario' },
    ];
  }
};

// Rellena el formulario si se está editando un usuario
watch(() => props.user, (newUser ) => {
  if (newUser ) {
    form.value = { 
      username: newUser .username || '',
      phone_number: newUser .phone_number || '',
      email: newUser .email || '',
      rol: newUser .rol || '',
      url_imagen: newUser .url_imagen || ''
    };
  }
});

// Inicializa los roles
roles.value = getRoles();

const submitForm = async () => {
  try {
    if (props.user) {
      // Actualizar usuario
      const id = props.user.id;
      await $fetch(`${config.public.BACKEND_URL}/api/u/edit-usuario/${id}`, {
        method: 'PUT',
        body: form.value,
      });
    } else {
      // Agregar nuevo usuario
      await $fetch(`${config.public.BACKEND_URL}/api/u/add-usuario`, {
        method: 'POST',
        body: form.value,
      });
    }
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Error al guardar el usuario:', error);
    // Aquí puedes agregar un mensaje de error para el usuario
  }
};
</script>

<style scoped>
/* Estilos opcionales */
</style>