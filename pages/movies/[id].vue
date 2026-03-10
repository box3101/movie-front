<template>
  <div v-if="movie">
    <!-- 뒤로가기 -->
    <NuxtLink to="/" class="inline-flex items-center text-gray-400 hover:text-white transition mb-6">
      ← 목록으로
    </NuxtLink>

    <!-- 영화 상세 -->
    <div class="flex flex-col md:flex-row gap-8">
      <!-- 포스터 -->
      <div class="flex-shrink-0">
        <img
          :src="movie.poster"
          :alt="movie.title"
          class="w-72 h-[430px] object-cover rounded-lg"
        />
      </div>

      <!-- 정보 -->
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <h1 class="text-3xl font-bold">{{ movie.title }}</h1>
          <span
            v-if="movie.isNowPlaying"
            class="px-2 py-0.5 bg-red-600 text-white text-xs rounded"
          >
            상영중
          </span>
        </div>

        <!-- 평점 -->
        <div class="flex items-center gap-2 mb-6">
          <span class="text-yellow-400 text-xl">★</span>
          <span class="text-xl font-semibold">{{ movie.rating }}</span>
          <span class="text-gray-400">/ 10</span>
        </div>

        <!-- 상세 정보 테이블 -->
        <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm mb-8">
          <span class="text-gray-400">장르</span>
          <span>{{ movie.genre }}</span>

          <span class="text-gray-400">감독</span>
          <span>{{ movie.director }}</span>

          <span class="text-gray-400">개봉일</span>
          <span>{{ movie.releaseDate }}</span>

          <span class="text-gray-400">상영시간</span>
          <span>{{ movie.duration }}분</span>
        </div>

        <!-- 줄거리 -->
        <div>
          <h2 class="text-lg font-semibold mb-2">줄거리</h2>
          <p class="text-gray-300 leading-relaxed">{{ movie.description }}</p>
        </div>
      </div>
    </div>
  </div>

  <!-- 영화 없음 -->
  <div v-else class="text-center py-20">
    <p class="text-gray-400 text-lg">영화를 찾을 수 없습니다.</p>
    <NuxtLink to="/" class="text-red-400 hover:text-red-300 mt-4 inline-block">
      홈으로 돌아가기
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { movies } from '~/data/movies'

const route = useRoute()
const movie = movies.find((m) => m.id === Number(route.params.id))
</script>
