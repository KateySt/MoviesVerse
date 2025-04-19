<template>
  <div>
    <ul class="flex flex-col gap-4">
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

const movieStore = useMovieStore()
const route = useRoute()
const router = useRouter()

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
  await movieStore.fetchMovies(pageMovies.value)
  displayedMovies.value = movieStore.movies.slice(0, itemsPerScroll)
  setupObserver()
})

watch(
  () => route.query.page,
  async newPage => {
    if (newPage) {
      const page = parseInt(newPage as string)
      await movieStore.fetchMovies(page)
      displayedMovies.value = movieStore.movies.slice(0, itemsPerScroll)
    }
  }
)
</script>
