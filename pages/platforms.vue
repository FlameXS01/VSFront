<!-- Page principal de plataformas donde se van a listar
 y gestionar, se importa el componente PlatformList -->
<template>
  <section class="p-6">
    <h1 class="text-3xl text-orange-500 mb-6">Plataformas</h1>
    <PlatformList />
  </section>
</template>

<script setup>
import PlatformList from '~/components/platform/PlatformList.vue'
</script>
  