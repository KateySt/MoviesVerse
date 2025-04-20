<template>
  <li
    class="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 dark:bg-gray-800"
  >
    <img
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      alt="Poster"
      class="w-full h-64 object-cover"
    />

    <div class="p-4 space-y-3">
      <div class="flex items-center justify-between">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white">
          {{ movie.title }}
        </h2>
        <span
          class="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full dark:bg-indigo-800 dark:text-indigo-200"
        >
          {{ movie.vote_average.toFixed(1) }}
        </span>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-300 italic">
        Original: {{ movie.original_title }}
      </p>

      <p class="text-sm text-gray-700 dark:text-gray-400 line-clamp-3">
        {{ movie.overview }}
      </p>

      <div class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span>{{ movie.release_date }}</span>
        <span v-if="movie.video" class="text-green-600 font-medium">Video Available</span>
        <span v-else class="text-red-500 font-medium">No Video</span>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  movie: {
    id: number
    title: string
    original_title: string
    overview: string
    poster_path: string
    vote_average: number
    release_date: string
    video: boolean
  }
}>()
</script>
