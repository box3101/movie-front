<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">현재 상영작</h2>

    <!-- /*
      장르 필터 버튼
      - 장르 목록에 대한 반복문 ( v-for="genre in genres" )
      - 장르 버튼 클릭 시 선택된 장르 상태 관리 ( @click="selectedGenre = genre" )
      - 선택된 장르에 따라 버튼 스타일 변경 ( :class="selectedGenre === genre ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'" )
      - 장르 버튼 클릭 시 선택된 장르 상태 관리 ( @click="selectedGenre = genre" )
    */ -->
    <div class="flex gap-2 mb-6">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="selectedGenre = genre"
        :class="selectedGenre === genre ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'"
        class="px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition">
        {{ genre }}
      </button>
    </div>

    <input
      type="text"
      placeholder="영화 제목을 검색하세요"
      class="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />

    <!-- /*
      영화 카드 그리드
      - 필터링된 영화 목록에 대한 반복문 ( v-for="movie in filteredMovies" )
      - 영화 카드 클릭 시 영화 상세 페이지로 이동 ( :to="'/movies/' + movie.id" )
      - 영화 카드 스타일 변경 ( class="bg-gray-800 ... )
    */ -->
    <div class="grid grid-cols-4 gap-6">
      <NuxtLink
        :to="'/movies/' + movie.id"
        v-for="movie in filteredMovies"
        :key="movie.id"
        class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition">
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

/*
  장르 필터 버튼 클릭 시 선택된 장르 상태 관리
*/
const selectedGenre = ref('전체')

/*
  영화 제목 검색 쿼리 관리
*/

/*
  영화 목록 필터링
  - 선택된 장르에 따라 영화 목록 필터링
  - '전체' 선택 시: 모든 영화 반환 ( true 인 영화만 표시 )
  - 특정 장르 선택 시: 해당 장르의 영화만 필터링 ( selectedGenre.value === '전체' || m.genre === selectedGenre.value )
  - 영화 제목 검색 쿼리 포함 여부 필터링
*/
const filteredMovies = computed(() => {
  return movies.filter((m) => selectedGenre.value === '전체' || m.genre === selectedGenre.value)
})
</script>
