<template>
  <div>
    <h1>여기서부터 시작!</h1>

    <h2>영화목록</h2>
    <div v-for="movie in movies" :key="movie.id">
      {{ movie.title }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'
</script>
