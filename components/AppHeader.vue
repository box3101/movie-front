<template>
  <header class="bg-white border-b border-gray-200">
    <nav class="max-w-[1200px] mx-auto px-4">
      <div class="flex items-center justify-between py-4">
        <div class="text-2xl font-bold text-red-600">
          무비시네마
        </div>
        <ul class="flex gap-8 text-gray-700">
          <li>
            <NuxtLink to="/" class="hover:text-red-600 font-medium">스토어</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/" class="hover:text-red-600 font-medium">영화</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/ticketing" class="hover:text-red-600 font-medium">예매</NuxtLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup>
</script>
