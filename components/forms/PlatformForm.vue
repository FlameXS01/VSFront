<template>
    <div class="p-6 bg-gray-800 rounded-lg">
      <h2 class="text-xl text-green-400 mb-4">Gestión de Plataformas</h2>
      <!-- Formulario -->
      <form @submit.prevent="addPlatform" class="mb-6">
        <label class="block text-gray-400 mb-2">Nombre de la Plataforma:</label>
        <input
          v-model="platformName"
          type="text"
          placeholder="Ej: PlayStation, Xbox"
          class="p-2 bg-gray-700 text-white rounded-lg w-full mb-4"
        />
        <button
          type="submit"
          class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition"
        >
          Añadir Plataforma
        </button>
      </form>
  
      <!-- Lista de Plataformas -->
      <ul>
        <li
          v-for="(platform, index) in platforms"
          :key="index"
          class="flex justify-between items-center bg-gray-900 p-4 mb-2 rounded-lg"
        >
          <span>{{ platform }}</span>
          <div>
            <button
              @click="editPlatform(index)"
              class="text-blue-400 hover:underline mr-4"
            >
              Editar
            </button>
            <button
              @click="deletePlatform(index)"
              class="text-red-400 hover:underline"
            >
              Eliminar
            </button>
          </div>
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const platforms = ref(['PlayStation', 'Xbox', 'Nintendo Switch'])
  const platformName = ref('')
  
  function addPlatform() {
    if (platformName.value.trim()) {
      platforms.value.push(platformName.value.trim())
      platformName.value = ''
    }
  }
  
  function editPlatform(index) {
    const editedName = prompt('Editar plataforma:', platforms.value[index])
    if (editedName !== null && editedName.trim()) {
      platforms.value[index] = editedName.trim()
    }
  }
  
  function deletePlatform(index) {
    platforms.value.splice(index, 1)
  }
  </script>
  