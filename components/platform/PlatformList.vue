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
      <PlatformForm v-if="showForm" :plataforma="selectedPlataforma" @close="showForm = false" @refresh="fetchPlataformas" />
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import PlatformForm from './PlatformForm.vue'
  const config = useRuntimeConfig()
  
  const plataformas = ref([])
  const showForm = ref(false)
  const selectedPlataforma = ref(null)
  
  const fetchPlataformas = async () => {
  try {
    plataformas.value = await $fetch(`${config.public.backend_url}/CheckpointReviews/plataformas`);
  } catch (error) {
    console.error('Error fetching plataformas:', error);
  }
}
  
  const editPlataforma = (plataforma) => {
    selectedPlataforma.value = plataforma
    showForm.value = true
  }
  
  const deletePlataforma = async (id) => {
    await $fetch(`${config.public.backend_url}/CheckpointReviews/plataformas/deletePlataforma/${id}`, { method: 'DELETE' })
    fetchPlataformas()
  }
  
  onMounted(fetchPlataformas)
  </script>