<template>
  <div v-if="totalPage > 1" class="flex items-center justify-center gap-4 pt-6">
    <button
      :disabled="pageMovies <= 1"
      class="px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="changePage(pageMovies - 1)"
    >
      ← {{ $t('message.Back') }}
    </button>

    <span class="text-lg font-medium px-2"> {{ pageMovies }} - {{ totalPage }} </span>

    <button
      :disabled="pageMovies >= totalPage"
      class="px-4 py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
      @click="changePage(pageMovies + 1)"
    >
      {{ $t('message.Next') }} →
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  pageMovies: {
    type: Number,
    required: true,
  },
  totalPage: {
    type: Number,
    required: true,
  },
  changePage: {
    type: Function,
    required: true,
  },
})
</script>
