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
    <!-- <div class="flex gap-2 mb-6">
      <button
        v-for="genre in genres"
        :key="genre"
        @click="selectedGenre = genre"
        :class="selectedGenre === genre ? 'bg-red-600 text-white' : 'bg-gray-700 text-gray-300'"
        class="px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition">
        {{ genre }}
      </button>
    </div> -->

    <div class="flex gap-5">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="영화 제목을 검색하세요"
        class="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />

      <!-- 정렬 드롭다운 -->
      <select
        v-model="sortOrder"
        class="w-full mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500">
        <option value="rating">평점순</option>
        <option value="title">제목순</option>
        <option value="releaseDate">개봉일순</option>
      </select>
    </div>

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
        <img :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
        <div class="p-3">
          <div class="flex justify-between items-center">
            <h3 class="font-semibold">{{ movie.title }}</h3>
            <button @click.prevent="toggleFavorite(movie.id)" class="text-red-500 text-lg">
              {{ isFavorite(movie.id) ? '♥' : '♡' }}
            </button>
          </div>
          <p class="text-sm text-gray-400">★ {{ movie.vote_average }}</p>
        </div>
      </NuxtLink>
    </div>

    <!-- 페이지네이션 -->
    <div class="flex gap-1 justify-center mt-8">
      <button
        @click="onPageChange(1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
        «
      </button>
      <button
        @click="onPageChange(currentPage - 1)"
        :disabled="currentPage === 1"
        class="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
        ←
      </button>
      <button
        v-for="page in pageNumbers"
        :key="page"
        @click="onPageChange(page)"
        :class="page === currentPage ? 'bg-red-600 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'"
        class="px-3 py-2 rounded-lg min-w-[40px] transition">
        {{ page }}
      </button>
      <button
        @click="onPageChange(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
        →
      </button>
      <button
        @click="onPageChange(totalPages)"
        :disabled="currentPage === totalPages"
        class="px-3 py-2 rounded-lg bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white transition disabled:opacity-30 disabled:cursor-not-allowed">
        »
      </button>
    </div>

    <!-- 검색 결과 없음 -->
    <p v-if="filteredMovies.length === 0" class="text-center text-gray-400 py-10">
      검색 결과가 없습니다.
    </p>
  </div>
</template>

<script setup lang="ts">
// import { movies, genres } from '~/data/movies'
const { toggleFavorite, isFavorite } = useFavorite()

// 현재 상영작 목록 조회 함수 호출
const { fetchNowPlayingMovies } = useMovieApi()

const selectedGenre = ref('전체') // 선택된 장르 상태 관리
const searchQuery = ref('') // 검색 쿼리 상태 관리
const sortOrder = ref('rating') // 정렬 순서 상태 관리
const movies = ref([]) // API에서 받아올 영화 목록
const isLoading = ref(true) // 로딩 상태
const currentPage = ref(1) // 현재 페이지 번호
const totalPages = ref(0) // 총 페이지 수

/*
    페이지 로드 시 API 호출
*/

onMounted(async () => {
  const data = await fetchNowPlayingMovies(currentPage.value)
  movies.value = data.results
  totalPages.value = data.total_pages
  isLoading.value = false
})

/*
  페이지 변경 함수
*/

const onPageChange = async (pageNumber: number) => {
  currentPage.value = pageNumber
  const data = await fetchNowPlayingMovies(pageNumber)
  movies.value = data.results
}

/*
  영화 목록 필터링 + 정렬
  1. 장르 필터 → 2. 검색 필터 → 3. 정렬
*/
const filteredMovies = computed(() => {
  return (
    movies.value
      // .filter((m) => selectedGenre.value === '전체' || m.genre_ids === selectedGenre.value)
      .filter((m) => m.title.includes(searchQuery.value))
      .sort((a, b) => {
        if (sortOrder.value === 'rating') return b.vote_average - a.vote_average
        else if (sortOrder.value === 'title') return a.title.localeCompare(b.title)
        else if (sortOrder.value === 'releaseDate')
          return b.release_date.localeCompare(a.release_date)
        return 0
      })
  )
})

/*
  페이지 번호 목록
*/
const pageNumbers = computed(() => {
  const pages = []
  const start = Math.max(1, currentPage.value - 4) // 앞 4개
  const end = Math.min(totalPages.value, start + 9) // 총 10개

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})
</script>
