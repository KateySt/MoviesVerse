<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white">
    <header class="bg-white dark:bg-gray-800 shadow-md py-4 px-6">
      <div class="flex justify-start">
        <div class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">MovieVerse</div>
      </div>
    </header>

    <nav
      class="bg-indigo-50 dark:bg-indigo-900 border-b border-indigo-200 dark:border-indigo-700 py-2"
    >
      <div class="max-w-6xl mx-auto px-6 flex gap-4">
        <RouterLink to="/" class="text-indigo-700 dark:text-indigo-300 hover:underline">
          Home
        </RouterLink>
        <RouterLink to="/movie/11" class="text-indigo-700 dark:text-indigo-300 hover:underline">
          Movie
        </RouterLink>
      </div>
    </nav>

    <main class="max-w-6xl mx-auto px-6 py-8">
      <RouterView />
    </main>
  </div>
</template>

<script setup></script>
