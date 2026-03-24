<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-6">로그인</h1>

    <!-- 에러 메시지 (errorMsg가 있을 때만 표시) -->
    <p v-if="errorMsg" class="text-red-500 text-sm mb-4 bg-red-500/10 p-3 rounded-lg">
      {{ errorMsg }}
    </p>

    <!-- 이메일 입력 (v-model로 email과 양방향 바인딩) -->
    <div class="mb-4">
      <label class="block text-sm text-gray-400 mb-1">이메일</label>
      <input
        v-model="email"
        type="email"
        placeholder="이메일을 입력하세요"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 비밀번호 입력 (type="password"로 입력값 숨김) -->
    <div class="mb-6">
      <label class="block text-sm text-gray-400 mb-1">비밀번호</label>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 로그인 버튼 (클릭 시 onSignIn 실행) -->
    <button
      @click="onSignIn"
      class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
      로그인
    </button>

    <!-- 회원가입 페이지로 이동 링크 -->
    <p class="text-center text-gray-400 text-sm mt-4">
      계정이 없으신가요?
      <NuxtLink to="/register" class="text-red-400 hover:text-red-300">회원가입</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
// useAuth에서 로그인 함수 가져오기
const { signIn } = useAuth()

// ===== 상태 변수 =====
const email = ref('') // 이메일 입력값
const password = ref('') // 비밀번호 입력값
const errorMsg = ref('') // 에러 메시지

// ===== 로그인 실행 =====
const onSignIn = () => {
  errorMsg.value = ''

  // 유효성 검사 — 빈 값, 이메일 형식 체크
  if (!email.value.trim()) {
    errorMsg.value = '이메일을 입력하세요.'
    return
  }
  if (!email.value.includes('@')) {
    errorMsg.value = '올바른 이메일 형식이 아닙니다.'
    return
  }
  if (!password.value) {
    errorMsg.value = '비밀번호를 입력하세요.'
    return
  }

  // 로그인 시도 — 실패하면 catch에서 에러 메시지 표시
  try {
    signIn(email.value, password.value) // signIn 안에서 throw가 터졌을 때 잡힘
    navigateTo('/') // 성공 → 메인 페이지로 이동
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>
