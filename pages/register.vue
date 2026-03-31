<template>
  <div class="max-w-md mx-auto mt-20">
    <h1 class="text-2xl font-bold mb-6">회원가입</h1>

    <!-- 에러 메시지 (errorMsg가 있을 때만 표시) -->
    <p v-if="errorMsg" class="text-red-500 text-sm mb-4 bg-red-500/10 p-3 rounded-lg">
      {{ errorMsg }}
    </p>

    <!-- 이름 입력 -->
    <div class="mb-4">
      <label class="block text-sm text-gray-400 mb-1">이름</label>
      <input
        v-model="name"
        type="text"
        placeholder="이름을 입력하세요"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 이메일 입력 -->
    <div class="mb-4">
      <label class="block text-sm text-gray-400 mb-1">이메일</label>
      <input
        v-model="email"
        type="email"
        placeholder="이메일을 입력하세요"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 비밀번호 입력 -->
    <div class="mb-4">
      <label class="block text-sm text-gray-400 mb-1">비밀번호</label>
      <input
        v-model="password"
        type="password"
        placeholder="비밀번호를 입력하세요 (6자 이상)"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 비밀번호 확인 (위 비밀번호와 일치하는지 체크용) -->
    <div class="mb-6">
      <label class="block text-sm text-gray-400 mb-1">비밀번호 확인</label>
      <input
        v-model="passwordConfirm"
        type="password"
        placeholder="비밀번호를 다시 입력하세요"
        class="w-full px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500" />
    </div>

    <!-- 회원가입 버튼 -->
    <button
      @click="onRegister"
      class="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
      회원가입
    </button>

    <!-- 로그인 페이지로 이동 링크 -->
    <p class="text-center text-gray-400 text-sm mt-4">
      이미 계정이 있으신가요?
      <NuxtLink to="/login" class="text-red-400 hover:text-red-300">로그인</NuxtLink>
    </p>
  </div>
</template>

<script setup lang="ts">
// useAuth에서 회원가입 함수 가져오기
const { register } = useAuth()

// ===== 상태 변수 =====
const name = ref('') // 이름 입력값
const email = ref('') // 이메일 입력값
const password = ref('') // 비밀번호 입력값
const passwordConfirm = ref('') // 비밀번호 확인 입력값
const errorMsg = ref('') // 에러 메시지

// ===== 회원가입 실행 =====
const onRegister = () => {
  errorMsg.value = ''

  // 유효성 검사 — 빈 값, 이메일 형식, 비밀번호 길이, 비밀번호 일치 체크
  if (!name.value.trim()) {
    errorMsg.value = '이름을 입력하세요.'
    return
  }
  if (!email.value.trim()) {
    errorMsg.value = '이메일을 입력하세요.'
    return
  }
  if (!email.value.includes('@')) {
    errorMsg.value = '올바른 이메일 형식이 아닙니다.'
    return
  }
  if (password.value.length < 6) {
    errorMsg.value = '비밀번호는 6자 이상이어야 합니다.'
    return
  }
  if (password.value !== passwordConfirm.value) {
    errorMsg.value = '비밀번호가 일치하지 않습니다.'
    return
  }

  // 회원가입 시도 — 이메일 중복이면 catch에서 에러 메시지 표시
  try {
    register(name.value, email.value, password.value)
    navigateTo('/login') // 성공 → 로그인 페이지로 이동
  } catch (e) {
    errorMsg.value = e.message
  }
}
</script>
