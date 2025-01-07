<template>
  <div class="p-6 bg-gray-800 rounded-lg">
    <h2 class="text-xl text-green-400 mb-4">{{ plataforma ? 'Editar Plataforma' : 'Agregar Plataforma' }}</h2>
    <form @submit.prevent="submitForm" class="mb-6">
      <label class="block text-gray-400 mb-2">Nombre de la Plataforma:</label>
      <input 
        v-model="form.nombre_plataforma" 
        type="text" 
        placeholder="Ej: PlayStation, Xbox" 
        class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4" 
        required 
      />
      <button type="submit" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition">
        {{ plataforma ? 'Actualizar' : 'Agregar' }}
      </button>
      <button @click="$emit('close')" type="button" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition ml-4">Cancelar</button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRuntimeConfig } from '#app'; // Importa useRuntimeConfig

const props = defineProps(['plataforma']);
const emit = defineEmits(['close', 'refresh']);
const config = useRuntimeConfig(); // Define config aquí

const form = ref({
  nombre_plataforma: ''
});

// Observa los cambios en props.plataforma
watch(() => props.plataforma, (newVal) => {
  if (newVal) {
    form.value.nombre_plataforma = newVal.nombre_plataforma; // Asigna el nombre de la plataforma al formulario
  } else {
    form.value.nombre_plataforma = ''; // Limpia el campo si no hay plataforma
  }
}, { immediate: true }); // Ejecuta inmediatamente para establecer el valor inicial

const submitForm = async () => {
  const method = props.plataforma ? 'PUT' : 'POST';
  const id = props.plataforma ? props.plataforma.id : null; // Obtén el ID de la plataforma

  const url = props.plataforma 
    ? `${config.public.backend_url}/CheckpointReviews/plataformas/editPlataforma/${id}` 
    : `${config.public.backend_url}/CheckpointReviews/plataformas/addPlataforma`;

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
  }
};
</script>