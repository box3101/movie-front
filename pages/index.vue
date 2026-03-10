<template>
  <div>
    <h2 class="text-2xl font-bold mb-6">현재 상영작</h2>

    <!-- 영화 카드 그리드 -->
    <div class="grid grid-cols-4 gap-6">
      <NuxtLink
        :to="'/movies/' + movie.id"
        v-for="movie in movies"
        :key="movie.id"
        class="bg-gray-800 rounded-lg overflow-hidden">
        <!-- 포스터 -->
        <img :src="movie.poster" :alt="movie.title" class="w-full h-64 object-cover" />
      </NuxtLink>
    </div>
  </div>
</template>
