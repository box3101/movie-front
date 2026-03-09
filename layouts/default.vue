<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 헤더 -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-red-500">MOVIEMOVIE</NuxtLink>
        <nav class="flex gap-6">
          <NuxtLink to="/" class="hover:text-red-400 transition">홈</NuxtLink>
          <!-- <NuxtLink to="/movies" class="hover:text-red-400 transition">영화</NuxtLink>
          <NuxtLink to="/booking" class="hover:text-red-400 transition">예매</NuxtLink> -->
        </nav>
      </div>
    </header>

    <!-- 본문 -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>
