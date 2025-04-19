<template>
  <div>
    <h1>Movie Details</h1>
    <p>Movie ID: {{ id }}</p>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id
</script>
