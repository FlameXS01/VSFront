<template>
  <div class="max-h-screen overflow-y-auto p-6">
    <form @submit.prevent="submitForm" class="bg-gray-800 text-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
    
      <h2 class="text-2xl font-bold mb-4 text-center">{{ product ? 'Editar Producto' : 'Agregar Producto' }}</h2>
      
      <label class="block mb-2">Nombre del Producto</label>
      <input v-model="form.desc_prod" type="text" required class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa la descripción" style="color: black;" />
      
      <label class="block mb-2">Código de Producto</label>
      <input v-model="form.cod_prod" type="text" required class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa el código del producto" style="color: black;" />
      
      <label class="block mb-2">Código de Ubicación</label>
      <input v-model="form.cod_ub" type="text" required class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa el código de ubicación" style="color: black;" />

      <label class="block mb-2">Precio</label>
      <input v-model="form.price" type="number" required class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa el precio" style="color: black;" />
      
      <div class="flex space-x-4 mb-4">
        <div class="flex-1">
          <label class="block mb-2">Cantidad</label>
          <input v-model="form.h_much" type="number" required class="p-2 border rounded-lg w-full" placeholder="Ingresa la cantidad" style="color: black;" />
        </div>
        <div class="flex-1">
          <label class="block mb-2">Métrica</label>
          <input v-model="form.unit" type="text" required class="p-2 border rounded-lg w-full" placeholder="Unidad de medida" style="color: black;" />
        </div>
      </div>

      <label class="block mb-2">Unidades</label>
      <div class="mb-4">
        <div v-if="units.length === 0" class="text-gray-400">Cargando unidades...</div>
        <div v-else>
          <div v-for="unit in units" :key="unit.id" class="flex items-center mb-2">
            <input
              type="checkbox"
              :value="unit.id"
              v-model="form.unityIds"
              class="mr-2"
            />
            <label class="text-white">{{ unit.unity_name }}</label>
          </div>
        </div>
      </div>

      <label class="block mb-2">URL de Imagen</label>
      <input v-model="form.url_imagen" type="text" class="p-2 border rounded-lg w-full mb-4" placeholder="Ingresa la URL de la imagen" style="color: black;" />

      <button type="submit" class="bg-red-400 text-white px-4 py-2 rounded-lg hover:bg-red-500 transition w-full">
        {{ product ? 'Actualizar Producto' : 'Agregar Producto' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  product: Object,
});
const config = useRuntimeConfig();

const emit = defineEmits(['close', 'refresh']);

const form = ref({
  cod_prod: '',
  cod_ub: '',
  desc_prod: '',
  price: 0,
  h_much: 0,
  unit: '',
  unityIds: [],
  url_imagen: '',
});

// Rellena el formulario si se está editando un producto
watch(() => props.product, (newProduct) => {
  if (newProduct) {
    form.value = { 
      cod_prod: newProduct.cod_prod || '',
      cod_ub: newProduct.cod_ub || '',
      desc_prod: newProduct.desc_prod || '',
      price: newProduct.price || 0,
      h_much: newProduct.h_much || 0,
      unit: newProduct.unit || '',
      unityIds: newProduct.unityId || '',
      url_imagen: newProduct.url_imagen || ''
    };
  }
});

// Lista de unidades
const units = ref([]);


// Función para obtener las unidades desde el backend
const fetchUnits = async () => {
  try {
    const response = await $fetch(`${config.public.BACKEND_URL}/api/u/get-unidades`);
    units.value = response; // Asigna la respuesta a `units`
  } catch (error) {
    console.error('Error al obtener las unidades:', error);
  }
};

onMounted(() => {
  fetchUnits();
});

const submitForm = async () => {
  try {
    if (props.product) {
      // Actualizar producto
      const id = props.product.id;
      await $fetch(`${config.public.BACKEND_URL}/api/p/edit-productos/${id}`, {
        method: 'PUT',
        body: form.value,
      });
    } else {
      // Agregar nuevo producto
      await $fetch(`${config.public.BACKEND_URL}/api/p/add-productos`, {
        method: 'POST',
        body: form.value,
      });
    }
    emit('refresh');
    emit('close');
  } catch (error) {
    console.error('Error al guardar el producto:', error);
    // Aquí puedes agregar un mensaje de error para el usuario
  }
};
</script>