// ===== 유저 상태 =====
// 새로고침해도 로그인 유지 (localStorage에서 복원)
const user = ref(
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('currentUser') || 'null')
    : null,
)

// 로그인 여부 (user가 있으면 true)
const isAuthenticated = computed(() => user.value !== null)

// ===== 로그인 =====
const signIn = (email: string, password: string) => {
  // 가입된 유저 목록에서 이메일+비밀번호 일치하는 유저 찾기
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const foundUser = users.find((u) => u.email === email && u.password === password)

  if (foundUser) {
    user.value = foundUser
    localStorage.setItem('currentUser', JSON.stringify(foundUser))
    return foundUser
  }
  throw new Error('일치하는 유저를 찾을 수 없습니다.')
}

// ===== 회원가입 =====
const register = (name: string, email: string, password: string) => {
  const users = JSON.parse(localStorage.getItem('users') || '[]')

  // 이메일 중복 체크
  if (users.some((u) => u.email === email)) {
    throw new Error('이미 가입된 이메일입니다.')
  }

  // 새 유저 추가
  users.push({ name, email, password })
  localStorage.setItem('users', JSON.stringify(users))
  return { name, email }
}

// ===== 로그아웃 =====
const logout = () => {
  user.value = null
  localStorage.removeItem('currentUser')
}

// ===== export =====
export const useAuth = () => {
  return { user, isAuthenticated, signIn, register, logout }
}
