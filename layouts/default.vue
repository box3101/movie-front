<template>
  <div class="min-h-screen bg-gray-900 text-white">
    <!-- 헤더 -->
    <header class="bg-gray-800 border-b border-gray-700">
      <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-red-500">
          MOVIEMOVIE
        </NuxtLink>
        <nav class="flex gap-6 items-center">
          <NuxtLink to="/" class="hover:text-red-400 transition">홈</NuxtLink>
          <NuxtLink to="/movies" class="hover:text-red-400 transition">영화</NuxtLink>
          <NuxtLink to="/booking" class="hover:text-red-400 transition">예매</NuxtLink>

          <!-- 로그인 상태 -->
          <template v-if="isAuthenticated">
            <span class="text-gray-300 text-sm">{{ user.name }}님</span>
            <button @click="onLogout" class="text-sm text-gray-400 hover:text-red-400 transition">로그아웃</button>
          </template>
          <NuxtLink v-else to="/login" class="text-sm text-gray-400 hover:text-red-400 transition">로그인</NuxtLink>
        </nav>
      </div>
    </header>

    <!-- 본문 -->
    <main class="max-w-7xl mx-auto px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const { user, isAuthenticated, logout } = useAuth()

const onLogout = () => {
  logout()
  navigateTo('/')
}
</script>
