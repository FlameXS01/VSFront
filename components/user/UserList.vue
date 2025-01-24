<template>
  <section class="p-6">
    <button v-if="isAdmin" @click="showForm = true" class="bg-red-400 text-white py-2 px-6 rounded-lg hover:bg-red-500 transition mb-4">Agregar Usuario</button>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <User Card
        v-for="user in users"
        :key="user.id"
        :username="user.username"
        :email="user.email"
        :phone="user.phone_number"
        :image="user.url_imagen"
        :user="user"
        @edit="editUser "
        @delete="deleteUser "
      />
    </div>
    <Modal v-if="showForm" @close="showForm = false">
      <User Form :user="selectedUser " @close="showForm = false" @refresh="fetchUsers" />
    </Modal>
    <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import UserCard from '~/components/user/UserCard.vue'; // Asegúrate de que la ruta sea correcta
import UserForm from '~/components/user/UserForm.vue'; // Asegúrate de que la ruta sea correcta
import Modal from '~/components/Modal.vue'; 

const config = useRuntimeConfig();
const { data } = useAuth();
const users = ref([]);
const showForm = ref(false);
const selectedUser  = ref(null);
const errorMessage = ref(''); // Estado para el mensaje de error

const isAdmin = ref(false); // Estado para verificar si el usuario es administrador

const fetchUsers = async () => {
  try {
    users.value = await $fetch(`${config.public.BACKEND_URL}/api/u/get-usuarios`);
    isAdmin.value = data.value?.rol === 'administrador'; // Verificar si el usuario es administrador
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    errorMessage.value = 'No se pudieron cargar los usuarios. Intenta de nuevo más tarde.';
  }
};

const editUser  = (user) => {
  selectedUser .value = user;
  showForm.value = true;
};

const deleteUser  = async (id) => {
  try {
    await $fetch(`${config.public.BACKEND_URL}/api/u/del-usuarios/${id}`, { method: 'DELETE' });
    fetchUsers();
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    errorMessage.value = 'No se pudo eliminar el usuario. Intenta de nuevo.';
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
/* Estilos opcionales */
</style>