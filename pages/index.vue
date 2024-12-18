<template>
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      <GameCard
        title="The Legend of Zelda"
        description="Una aventura épica en el reino de Hyrule."
      />
      <GameCard
        title="Super Mario Odyssey"
        description="Explora mundos con Mario y su compañero Cappy."
      />
      <GameCard
        title="Halo Infinite"
        description="Únete al Jefe Maestro en su última misión."
      />
    </section>
  </template>
  
  <script setup>
  import GameCard from '~/components/GameCard.vue'
  </script>
  