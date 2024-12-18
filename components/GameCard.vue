<template>
    <div class="bg-gray-800 p-6 rounded-lg text-center">
      <h3 class="text-2xl text-orange-500 mb-4">{{ title }}</h3>
      <p class="text-gray-400">{{ description }}</p>
      <button class="bg-green-400 text-white py-2 px-6 mt-4 rounded-lg hover:bg-green-500 transition">
        Ver más
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps({
    title: String,
    description: String,
  })
  </script>
  