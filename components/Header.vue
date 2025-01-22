<template>
    <header class="bg-gray-800">
      <!-- Logo y Nombre -->
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-4">
          <!-- Logo optimizado con NuxtImage -->
          <NuxtImg
            src="/images/logo.png"
            format="webp"
            alt="RT Virtual shop logo"
            width="48"
            height="48"
            class="rounded-md"
          />
          <h1 class="text-2xl text-red-400 font-bold">RT Virtual</h1>
        </div>
      </div>
      <Navbar />
    </header>
  </template>

<script setup>
import Navbar from './Navbar.vue'; 
</script>
  