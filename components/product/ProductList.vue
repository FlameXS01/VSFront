<template>
  <section class="p-6">
    <button v-if="isAdmin" @click="showForm = true" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition mb-4">Agregar Producto</button>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :title="product.desc_prod"
        :description="`Precio: $${product.price}`"
        :image="product.url_imagen"
        :product="product"
        @edit="editProduct"
        @delete="deleteProduct"
      />
    </div>
    <Modal v-if="showForm" @close="showForm = false">
      <ProductForm :product="selectedProduct" @close="showForm = false" @refresh="fetchProducts" />
    </Modal>
    <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import ProductCard from '~/components/product/ProductCard.vue';
import ProductForm from '~/components/product/ProductForm.vue';
import Modal from '~/components/Modal.vue'; 

const config = useRuntimeConfig();
const {data} = useAuth();
const products = ref([]);
const showForm = ref(false);
const selectedProduct = ref(null);
const errorMessage = ref(''); // Estado para el mensaje de error

const isAdmin = ref(false); // Estado para verificar si el usuario es administrador

const fetchProducts = async () => {
  try {
    products.value = await $fetch(`${config.public.BACKEND_URL}/api/p/get-productos`);
    isAdmin.value = data.value?.rol === 'administrador'; // Verificar si el usuario es administrador
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    errorMessage.value = error, 'No se pudieron cargar los productos. Intenta de nuevo más tarde.';
  }
};

const editProduct = (product) => {
  selectedProduct.value = product;
  showForm.value = true;
};

const deleteProduct = async (id) => {
  try {
    await $fetch(`${config.public.BACKEND_URL}/api/p/del-productos/${id}`, { method: 'DELETE' });
    fetchProducts();
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    errorMessage.value = 'No se pudo eliminar el producto. Intenta de nuevo.' ;
  }
};

onMounted(fetchProducts);
</script>