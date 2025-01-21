<template>
  <section class="p-6">
    <button @click="showForm = true" class="bg-green-400 text-white py-2 px-6 rounded-lg hover:bg-green-500 transition mb-4">Agregar Juego</button>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <GameCard
        v-for="game in games"
        :key="game.id"
        :title="game.titulo"
        :description="game.genero"
        :image="game.url_imagen"
        :game="game"
        @edit="editGame"
        @delete="deleteGame"
      />
    </div>
    <Modal v-if="showForm" @close="showForm = false">
      <GameForm :game="selectedGame" @close="showForm = false" @refresh="fetchGames" />
    </Modal>
    <p v-if="errorMessage" class="text-red-500 text-center mt-4">{{ errorMessage }}</p> <!-- Mostrar mensaje de error -->
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import GameCard from '~/components/game/GameCard.vue';
import GameForm from '~/components/game/GameForm.vue';
import Modal from '~/components/Modal.vue'; 
const config = useRuntimeConfig();

const games = ref([]);
const showForm = ref(false);
const selectedGame = ref(null);
const errorMessage = ref(''); // Estado para el mensaje de error

const fetchGames = async () => {
  try {
    games.value = await $fetch(`${config.public.backend_url}/CheckpointReviews/juegos`);
  } catch (error) {
    console.error('Error al obtener los juegos:', error);
    errorMessage.value = 'No se pudieron cargar los juegos. Intenta de nuevo más tarde.';
  }
};

const editGame = (game) => {
  selectedGame.value = game;
  showForm.value = true;
};

const deleteGame = async (id) => {
  try {
    await $fetch(`${config.public.backend_url}/CheckpointReviews/juegos/deleteJuego/${id}`, { method: 'DELETE' });
    fetchGames();
  } catch (error) {
    console.error('Error al eliminar el juego:', error);
    errorMessage.value = 'No se pudo eliminar el juego. Intenta de nuevo.';
  }
};

onMounted(fetchGames);
</script>