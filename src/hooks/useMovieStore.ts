import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '../api/instance'
import { Movie } from '../types/movie'

export const useMovieStore = defineStore('movieStore', () => {
  const movies = ref<Movie[]>([])
  const totalPage = ref<number>(0)
  const totalResults = ref<number>(0)

  const fetchMovies = async (page: number = 1, language?: string) => {
    try {
      const result = await api.movie.list({ page, language })
      totalPage.value = result.total_pages
      totalResults.value = result.total_results
      movies.value = result.results
    } catch (error) {
      console.error(error)
    }
  }

  const setPage = async (page: number) => {
    if (page <= totalPage.value) {
      await fetchMovies(page)
    }
  }

  return {
    totalPage,
    totalResults,
    movies,
    fetchMovies,
    setPage,
  }
})
