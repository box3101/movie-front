<template>
  <div class="py-8">
    <div class="flex gap-6 border-b border-gray-200 mb-6 pb-4">
      <button 
        @click="activeTab = 'current'"
        :class="activeTab === 'current' 
          ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-2' 
          : 'text-gray-500 hover:text-gray-700 pb-2'"
      >
        현재 상영작
      </button>
      <button 
        @click="activeTab = 'upcoming'"
        :class="activeTab === 'upcoming' 
          ? 'text-red-600 font-semibold border-b-2 border-red-600 pb-2' 
          : 'text-gray-500 hover:text-gray-700 pb-2'"
      >
        개봉 예정작
      </button>
    </div>
    <div class="flex flex-wrap" style="gap: 16px;">
      <div
        v-for="(movie, index) in movies"
        :key="movie.id"
        class="group cursor-pointer"
        style="flex: 0 0 calc((100% - 64px) / 5); min-width: 0;"
      >
        <div class="relative mb-3">
          <div class="absolute top-2 left-2 bg-black bg-opacity-70 text-white text-xs font-bold px-2 py-1 rounded z-10">
            {{ index + 1 }}
          </div>
          <img
            :src="movie.poster"
            :alt="movie.title"
            class="w-full object-cover rounded-lg shadow-md group-hover:shadow-xl transition-shadow"
            style="aspect-ratio: 184 / 262;"
          />
          <div class="absolute bottom-2 right-2 flex items-center gap-1 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
            </svg>
            <span>{{ movie.duration }}분</span>
          </div>
        </div>
        <h3 class="font-semibold text-gray-900 text-sm mb-1 group-hover:text-red-600 transition-colors">
          {{ movie.title }}
        </h3>
        <div class="flex items-center gap-2 text-xs text-gray-500">
          <span>{{ movie.genre }}</span>
          <span>•</span>
          <span class="text-yellow-500 font-semibold">{{ movie.rating }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { movies } from '~/data/movies'


</script>
