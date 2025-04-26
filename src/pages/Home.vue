<template>
  <div>
    <div class="pb-6">
      <input
        v-model="searchKeyword"
        type="text"
        :placeholder="$t('message.Search')"
        class="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />
    </div>

    <div v-if="loading" class="flex justify-center items-center my-4">
      <div
        class="w-8 h-8 border-4 border-t-4 border-gray-900 dark:border-b-gray-50 border-solid rounded-full animate-spin"
      ></div>
    </div>

    <div
      v-if="!loading && displayedMovies.length === 0"
      class="flex justify-center items-center my-4"
    >
      <p class="text-xl text-gray-600 dark:text-gray-300">
        {{ $t('message.notFound') }}
      </p>
    </div>

    <ul v-if="!loading && displayedMovies.length > 0" class="flex flex-col gap-4">
      <MovieCard v-for="movie in displayedMovies" :key="movie.id" :movie="movie" />
    </ul>

    <div ref="observerTarget" class="h-1"></div>

    <Pagination
      v-if="!canShowMore"
      :page-movies="pageMovies"
      :total-page="totalPage"
      :change-page="changePage"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMovieStore } from '../hooks/useMovieStore'
import Pagination from '../components/Pagination.vue'
import MovieCard from '../components/MovieCard.vue'
import debounce from 'lodash/debounce'

const movieStore = useMovieStore()
const route = useRoute()
const router = useRouter()
const searchKeyword = ref('')
const loading = ref(false)

const pageMovies = computed(() => {
  return route.query.page ? parseInt(route.query.page as string) : 1
})

const movies = computed(() => movieStore.movies)
const totalPage = computed(() => movieStore.totalPage)

const displayedMovies = ref([] as typeof movieStore.movies)
const itemsPerScroll = 5
const observerTarget = ref<HTMLElement | null>(null)

const canShowMore = computed(() => {
  return displayedMovies.value.length < movies.value.length
})

const loadMore = () => {
  const nextChunk = movies.value.slice(
    displayedMovies.value.length,
    displayedMovies.value.length + itemsPerScroll
  )
  displayedMovies.value.push(...nextChunk)
}

// Intersection Observer
const setupObserver = () => {
  const observer = new IntersectionObserver(
    entries => {
      const [entry] = entries
      if (entry.isIntersecting && canShowMore.value) {
        loadMore()
      }
    },
    {
      root: null,
      threshold: 1.0,
    }
  )

  if (observerTarget.value) {
    observer.observe(observerTarget.value)
  }
}

const changePage = (page: number) => {
  router.push({ query: { page: page.toString() } })
  movieStore.setPage(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(async () => {
  loading.value = true
  await movieStore.fetchMovies(pageMovies.value, undefined, searchKeyword.value)
  displayedMovies.value = movieStore.movies.slice(0, itemsPerScroll)
  setupObserver()
  loading.value = false
})

const debouncedSearch = debounce(async (keyword: string) => {
  loading.value = true
  await movieStore.fetchMovies(1, undefined, keyword)
  displayedMovies.value = movieStore.movies.slice(0, itemsPerScroll)
  await router.push({ query: { page: '1' } })
  loading.value = false
}, 500)

watch(searchKeyword, newKeyword => {
  debouncedSearch(newKeyword)
})

watch(
  () => route.query.page,
  async newPage => {
    if (newPage) {
      const page = parseInt(newPage as string)
      loading.value = true
      await movieStore.fetchMovies(page, undefined, searchKeyword.value)
      displayedMovies.value = movieStore.movies.slice(0, itemsPerScroll)
      loading.value = false
    }
  }
)
</script>
