<template>
  <div class="p-6 bg-gray-800 rounded-lg">
    <h2 class="text-xl text-green-400 mb-4">{{ game ? 'Editar Juego' : 'Agregar Juego' }}</h2>
    <form @submit.prevent="submitForm" class="mb-6">
      <label class="block text-gray-400 mb-2">Título del Juego:</label>
      <input 
        v-model="form.titulo" 
        type="text" 
        placeholder="Ej: Elden Ring" 
        class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
        required 
      />
      <label class="block text-gray-400 mb-2">Género:</label>
      <input 
        v-model="form.genero" 
        type="text" 
        placeholder="Ej: RPG" 
        class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
        required 
      />
      <label class="block text-gray-400 mb-2">Fecha de Lanzamiento:</label>
      <input 
        v-model="form.fecha_lanzamiento" 
        type="date" 
        class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
      />
      <label class="block text-gray-400 mb-2">URL de la Imagen:</label>
      <input 
        v-model="form.url_imagen" 
        type="text" 
        placeholder="Ej: https://example.com/elden-ring.jpg" 
        class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
      />
      <button type="submit" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition">
        {{ game ? 'Actualizar' : 'Agregar' }}
      </button>
      <button @click="$emit('close')" type="button" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition ml-4">Cancelar</button>
    </form>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRuntimeConfig } from '#app'; // Importa useRuntimeConfig

const props = defineProps(['game']);
const emit = defineEmits(['close', 'refresh']);
const config = useRuntimeConfig(); // Define config aquí

const form = ref({
  titulo: '',
  genero: '',
  fecha_lanzamiento: '',
  url_imagen: ''
});
const errorMessage = ref(''); // Estado para el mensaje de error

// Observa los cambios en props.game
watch(() => props.game, (newVal) => {
  if (newVal) {
    form.value.titulo = newVal.titulo;
    form.value.genero = newVal.genero;
    form.value.fecha_lanzamiento = newVal.fecha_lanzamiento;
    form.value.url_imagen = newVal.url_imagen;
  } else {
    form.value.titulo = '';
    form.value.genero = '';
    form.value.fecha_lanzamiento = '';
    form.value.url_imagen = '';
  }
}, { immediate: true }); // Ejecuta inmediatamente para establecer el valor inicial

const submitForm = async () => {
  const method = props.game ? 'PUT' : 'POST';
  const id = props.game ? props.game.id : null; // Obtén el ID del juego

  const url = props.game 
    ? `${config.public.backend_url}/CheckpointReviews/juegos/editJuego/${id}` 
    : `${config.public.backend_url}/CheckpointReviews/juegos/addJuego`;

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