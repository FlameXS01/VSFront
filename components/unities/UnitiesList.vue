<template>
  <section class="p-6">
    <button v-if="isAdmin" @click="showForm = true" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition mb-4">Agregar Unidad</button>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <UnitiesCard
        v-for="unity in units"
        :key="unity.id"
        :unity_name="unity.unity_name"
        :complex="unity.complex"
        :cost_center="unity.cost_center"
        :products="unity.products"
        :unity="unity"
        @edit="editUnity"
        @delete="deleteUnity"
        @viewProducts="viewProducts"
      />
    </div>
    <Modal v-if="showForm" @close="showForm = false">
      <UnitiesForm :unity="selectedUnity" :products="products" @close="showForm = false" @refresh="fetchUnits" />
    </Modal>
    <Modal v-if="showProducts" @close="showProducts = false">
      <ProductInUnities 
        :products="selectedProducts"
        @close="showProducts = false"
        @delete="deleteProduct"
      />
    </Modal>
    <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UnitiesCard from '~/components/unities/UnitiesCard.vue';
import UnitiesForm from '~/components/unities/UnitiesForm.vue';
import Modal from '~/components/Modal.vue'; 
import ProductInUnities from '~/components/unities/ProductInUnities.vue'; // Asegúrate de importar el componente


const config = useRuntimeConfig();
const { data } = useAuth();
const units = ref([]);
const products = ref([]); // Para almacenar la lista de productos
const showForm = ref(false);
const showProducts = ref(false);
const selectedUnity = ref(null);
const selectedTempUnity = ref(null);
const selectedProducts = ref([]);
const errorMessage = ref(''); // Estado para el mensaje de error

const isAdmin = ref(false); // Estado para verificar si el usuario es administrador

const showAddProductModal = (unityId) => {
  selectedTempUnity.value = unityId; // Guardar el ID de la unidad seleccionada
  showAddProduct.value = true; // Cambiar el estado para mostrar el modal
};
const fetchUnits = async () => {
  try {
    units.value = await $fetch(`${config.public.BACKEND_URL}/api/u/get-unidades`);
    isAdmin.value = data.value?.rol === 'administrador'; // Verificar si el usuario es administrador
  } catch (error) {
    console.error('Error al obtener las unidades:', error);
    errorMessage.value = 'No se pudieron cargar las unidades. Intenta de nuevo más tarde.';
  }
};

const editUnity = (unity) => {
  selectedUnity.value = unity;
  showForm.value = true;
};

const deleteUnity = async (id) => {
  try {
    await $fetch(`${config.public.BACKEND_URL}/api/u/del-unidades/${id}`, { method: 'DELETE' });
    fetchUnits();
  } catch (error) {
    console.error('Error al eliminar la unidad:', error);
    errorMessage.value = 'No se pudo eliminar la unidad. Intenta de nuevo.';
  }
};
const viewProducts = async (unityId) => {
  try {
    // Lógica para obtener los productos de la unidad seleccionada
    const response = await $fetch(`${config.public.BACKEND_URL}/api/u/get-prodByUnid/${unityId}`);
    selectedProducts.value = response; 
    showProducts.value = true;
    selectedTempUnity.value = unityId;
    console.log(selectedProducts) // Mostrar el modal con los productos
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    errorMessage.value = 'No se pudieron cargar los productos. Intenta de nuevo más tarde.';
  }
};
// Función para eliminar un producto
// Función para eliminar un producto
const deleteProduct = async (productId) => {
  try {
    // Obtener el ID de la unidad seleccionada
    const idU = selectedTempUnity.value; 
    await $fetch(`${config.public.BACKEND_URL}/api/p/del-productosInUnity/${productId}`, {
      method: 'DELETE',
      body: { idU } // Enviar el ID de la unidad en el cuerpo de la solicitud
    });
    // Actualiza la lista de productos después de eliminar
    selectedProducts.value = selectedProducts.value.filter(product => product.id !== productId);
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    errorMessage.value = 'No se pudo eliminar el producto. Intenta de nuevo.';
  }
};


onMounted(fetchUnits);
</script>