<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-6xl font-extrabold text-red-600">404</h1>
      <p class="text-xl text-gray-700 mt-4">Oops! The page you're looking for doesn't exist.</p>
      <router-link
        to="/"
        class="mt-6 inline-block px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        Go back to Home
      </router-link>
    </div>
  </div>
</template>
