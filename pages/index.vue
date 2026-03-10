<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">현재 상영작</h2>

    <!-- 장르 필터 버튼 -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="selectedGenre = genre"
        :class="selectedGenre === genre ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'"
        class="px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition"
      >
        {{ genre }}
      </button>
    </div>

    <!-- 영화 카드 그리드 -->
    <div class="grid grid-cols-4 gap-6">
      <NuxtLink
        :to="'/movies/' + movie.id"
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition"
      >
        <img :src="movie.poster" :alt="movie.title" class="w-full h-64 object-cover" />
        <div class="p-3">
          <h3 class="font-semibold">{{ movie.title }}</h3>
          <p class="text-sm text-gray-400">{{ movie.genre }} · ★ {{ movie.rating }}</p>
        </div>
      </NuxtLink>
    </div>

    <!-- 검색 결과 없음 -->
    <p v-if="filteredMovies.length === 0" class="text-center text-gray-400 py-10">
      검색 결과가 없습니다.
    </p>
  </div>
</template>

<script setup lang="ts">
import { movies, genres } from '~/data/movies'

const selectedGenre = ref('전체')

const filteredMovies = computed(() => {
  return movies.filter((m) => selectedGenre.value === '전체' || m.genre === selectedGenre.value)
})
</script>
