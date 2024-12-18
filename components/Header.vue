<template>
    <header class="bg-gray-800">
      <!-- Logo y Nombre -->
      <div class="flex items-center justify-between p-4">
        <div class="flex items-center space-x-4">
          <!-- Logo optimizado con NuxtImage -->
          <NuxtImage
            src="/images/logo.png"
            alt="Checkpoint Reviews Logo"
            width="48"
            height="48"
            class="rounded-md"
          />
          <h1 class="text-2xl text-green-400 font-bold">Checkpoint Reviews</h1>
        </div>
      </div>
  
      <!-- Navbar -->
      <nav class="bg-gray-700 p-4">
        <ul class="flex justify-center space-x-6">
          <li>
            <NuxtLink to="/" class="text-gray-400 hover:text-green-400">Juegos</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/platforms/platforms" class="text-gray-400 hover:text-green-400">Plataformas</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/users" class="text-gray-400 hover:text-green-400">Usuarios</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
  </template>
  