<template>
  <div>
    <h1 class="text-2xl font-bold mb-8">마이페이지</h1>

    <!-- 유저 정보 -->
    <div class="bg-gray-800 rounded-lg p-6 mb-8">
      <h2 class="text-lg font-semibold mb-4">내 정보</h2>
      <div class="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 text-sm">
        <span class="text-gray-400">이름</span>
        <span>{{ user?.name }}</span>
        <span class="text-gray-400">이메일</span>
        <span>{{ user?.email }}</span>
      </div>
    </div>

    <!-- 찜한 영화 목록 -->
    <h2 class="text-lg font-semibold mb-4">찜한 영화 ({{ favoriteMovies.length }})</h2>

    <!-- 로딩 -->
    <div v-if="isLoading" class="grid grid-cols-4 gap-6">
      <div v-for="i in 4" :key="i" class="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
        <div class="w-full h-64 bg-gray-700"></div>
        <div class="p-3">
          <div class="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-gray-700 rounded w-1/2"></div>
        </div>
      </div>
    </div>

    <!-- 찜한 영화 카드 -->
    <div v-else-if="favoriteMovies.length > 0" class="grid grid-cols-4 gap-6">
      <NuxtLink
        :to="'/movies/' + movie.id"
        v-for="movie in favoriteMovies"
        :key="movie.id"
        class="bg-gray-800 rounded-lg overflow-hidden hover:ring-2 hover:ring-red-500 transition">
        <img
          :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path"
          class="w-full h-64 object-cover" />
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

    <!-- 찜한 영화 없음 -->
    <p v-else class="text-center text-gray-400 py-10">찜한 영화가 없습니다.</p>
  </div>
</template>

<script setup lang="ts">
// 로그인 필수
definePageMeta({
  middleware: 'auth',
})

const { user } = useAuth()
const { favorites, toggleFavorite, isFavorite } = useFavorite()
const { fetchMoviesByIds } = useMovieApi()

const favoriteMovies = ref([])
const isLoading = ref(true)

// 찜 해제하면 목록에서 바로 제거
// 합치면 (1개)
watch(
  favorites,
  async (newVal) => {
    if (newVal.length > 0) {
      favoriteMovies.value = await fetchMoviesByIds(newVal)
    } else {
      favoriteMovies.value = []
    }
    isLoading.value = false
  },
  { immediate: true },
) // ← 페이지 열릴 때도 바로 실행!
</script>
