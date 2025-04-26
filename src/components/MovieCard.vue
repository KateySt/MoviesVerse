<template>
  <li
    class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-[1.02] hover:shadow-xl border border-transparent hover:border-indigo-500 flex flex-col lg:flex-row"
  >
    <div class="w-full lg:w-1/3 aspect-[2/3] overflow-hidden">
      <img
        :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
        alt="Poster"
        class="w-full h-full object-cover transition duration-300"
      />
    </div>

    <div class="p-4 space-y-3 sm:space-y-4 w-full lg:w-2/3">
      <div class="flex items-center justify-between">
        <h2
          class="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white transition-colors"
        >
          {{ movie.title }}
        </h2>
        <span
          class="text-sm px-2 py-1 bg-indigo-100 text-indigo-700 rounded-full dark:bg-indigo-800 dark:text-indigo-200 transition"
        >
          {{ movie.vote_average.toFixed(1) }}
        </span>
      </div>

      <p class="text-sm text-gray-600 dark:text-gray-300 italic transition-colors">
        {{ $t('message.Original') }}: {{ movie.original_title }}
      </p>

      <p class="text-sm text-gray-700 dark:text-gray-400 line-clamp-3 transition-colors">
        {{ movie.overview }}
      </p>

      <div
        class="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 transition-colors"
      >
        <span>{{ movie.release_date }}</span>
        <span
          :class="
            movie.video
              ? 'text-green-600 dark:text-green-400 font-medium'
              : 'text-red-500 dark:text-red-400 font-medium'
          "
        >
          {{ movie.video ? $t('message.VideoAvailable') : $t('message.NoVideo') }}
        </span>
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
