<template>
  <div>
    <h1 class="text-2xl font-bold mb-6">영화 예매</h1>
    <p class="text-gray-400">예매 기능은 준비 중입니다.</p>
  </div>
</template>

<script setup lang="ts">
// 로그인 안 했으면 → /login으로 이동
// 이 페이지는 'auth' 미들웨어를 거쳐야 한다고 "정의"함
definePageMeta({
  middleware: 'auth',
})
</script>
