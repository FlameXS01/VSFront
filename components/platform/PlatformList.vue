<template>
  <div>
    <h2 class="text-xl text-green-400 mb-4">Lista de Plataformas</h2>
    <button @click="showForm = true" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition mb-4">Agregar Plataforma</button>
    <ul>
      <li v-for="plataforma in plataformas" :key="plataforma.id" class="flex justify-between items-center bg-gray-900 p-4 mb-2 rounded-lg">
        <span>{{ plataforma.nombre_plataforma }}</span>
        <div>
          <button @click="editPlataforma(plataforma)" class="text-blue-400 hover:underline mr-4">Editar</button>
          <button @click="deletePlataforma(plataforma.id)" class="text-red-400 hover:underline">Eliminar</button>
        </div>
      </li>
    </ul>
    <Modal v-if="showForm" @close="showForm = false">
      <PlatformForm :plataforma="selectedPlataforma" @close="showForm = false" @refresh="fetchPlataformas" />
    </Modal>
    <p v-if="errorMessage" class="text-red-500">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import PlatformForm from './PlatformForm.vue';
import Modal from '~/components/Modal.vue'; // Importa el componente Modal
const config = useRuntimeConfig();

const plataformas = ref([]);
const showForm = ref(false);
const selectedPlataforma = ref(null);
const errorMessage = ref(''); // Estado para el mensaje de error

const fetchPlataformas = async () => {
  try {
    plataformas.value = await $fetch(`${config.public.backend_url}/CheckpointReviews/plataformas`);
  } catch (error) {
    console.error('Error al obtener las plataformas:', error);
    errorMessage.value = 'No se pudieron cargar las plataformas. Intenta de nuevo más tarde.';
  }
};

const editPlataforma = (plataforma) => {
  selectedPlataforma.value = plataforma;
  showForm.value = true;
};

const deletePlataforma = async (id) => {
  try {
    await $fetch(`${config.public.backend_url}/CheckpointReviews/plataformas/deletePlataforma/${id}`, { method: 'DELETE' });
    fetchPlataformas();
  } catch (error) {
    console.error('Error al eliminar la plataforma:', error);
    errorMessage.value = 'No se pudo eliminar la plataforma. Intenta de nuevo.';
  }
};

onMounted(fetchPlataformas);
</script>