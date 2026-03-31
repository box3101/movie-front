export default defineNuxtRouteMiddleware(() => {
  // useAuth()에서 isAuthenticated 가져오기
  const { isAuthenticated } = useAuth()
  // 로그인 안 했으면 → navigateTo('/login')
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
})
