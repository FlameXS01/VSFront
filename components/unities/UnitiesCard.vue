<template>
  <div class="bg-gray-800 p-6 rounded-lg text-center">
    <NuxtImg
      v-if="image"
      :src="image"
      alt="Imagen del producto"
      class="w-full h-48 object-cover mb-4 rounded-lg"
      width="300"
      height="200"
      format="webp"
      lazy
    />
    <h3 class="text-2xl text-red-500 mb-4">{{ title }}</h3>
    <p class="text-gray-400">{{ description }}</p>
    <p class="text-lg text-white font-bold mt-2">{{ price }}</p> <!-- Mostrar el precio -->
    <div class="mt-4">
      <button @click="editProduct" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition mr-2">
        Editar
      </button>
      <button @click="deleteProduct" class="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700 transition">
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
  product: Object, // Propiedad para el objeto del producto
  price: Number // Nueva propiedad para el precio del producto
});

const emit = defineEmits(['edit', 'delete']);

const editProduct = () => {
  emit('edit', props.product);
};

const deleteProduct = () => {
  emit('delete', props.product.id); // Usar cod_prod como identificador
};
</script>

<style scoped>
/* Puedes agregar estilos adicionales aquí si es necesario */
</style>