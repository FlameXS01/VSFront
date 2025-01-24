<template>
  <div class="bg-gray-800 p-6 rounded-lg text-center">
    <NuxtImg
      v-if="image"
      :src="image"
      alt="Imagen del usuario"
      class="w-full h-48 object-cover mb-4 rounded-lg"
      width="300"
      height="200"
      format="webp"
      lazy
    />
    <h3 class="text-2xl text-red-500 mb-4">{{ title }}</h3>
    <p class="text-gray-400">{{ description }}</p>
    <div class="mt-4">
      <button @click="editUser" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition mr-2">
        Editar
      </button>
      <button @click="deleteUser" class="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition">
        Eliminar
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  description: String,
  image: String, // Nueva propiedad para la URL de la imagen
  user: Object, // Propiedad para el objeto del usuario
});

const emit = defineEmits(['edit', 'delete']);

const editUser = () => {
  emit('edit', props.user);
};

const deleteUser = () => {
  emit('delete', props.user.id); 
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>