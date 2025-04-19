import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { MovieResponse } from '../types/movie'

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL as string,
  timeout: 10000,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${import.meta.env.VITE_APP_API_KEY}`,
  },
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data

const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.get<T>(url, config).then(responseBody),
  post: <T>(url: string, body: any, config?: AxiosRequestConfig) =>
    instance.post<T>(url, body, config).then(responseBody),
  delete: <T>(url: string, config?: AxiosRequestConfig) =>
    instance.delete<T>(url, config).then(responseBody),
  put: <T>(url: string, body: any, config?: AxiosRequestConfig) =>
    instance.put<T>(url, body, config).then(responseBody),
}

const movie = {
  list: (queryParams?: {}) =>
    request.get<MovieResponse>('/3/discover/movie', { params: queryParams }),
}

const api = {
  movie,
}

export default api
