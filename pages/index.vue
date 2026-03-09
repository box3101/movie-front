<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">현재 상영작</h2>

    <!-- 영화 카드 그리드 -->
    <div class="grid grid-cols-4 gap-6">
      <div v-for="movie in movies" :key="movie.id" class="bg-gray-800 rounded-lg overflow-hidden">
        <!-- 포스터 -->
        <img :src="movie.poster" :alt="movie.title" class="w-full h-64 object-cover" />

        <!-- 영화 정보 -->
        <div class="p-4">
          <h3 class="text-lg font-semibold">{{ movie.title }}</h3>
          <div class="flex justify-between items-center mt-2 text-sm text-gray-400">
            <span>{{ movie.genre }}</span>
            <span class="text-yellow-400">{{ movie.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'
</script>
