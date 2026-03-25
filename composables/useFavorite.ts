// / 1. 찜 목록 상태 (영화 id 배열)
const favorites = ref<number[]>(
  typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('favorites') || '[]') : [],
)
// 2. 찜 토글 함수
const toggleFavorite = (id: number) => {
  const { isAuthenticated } = useAuth()
  if (!isAuthenticated.value) {
    return navigateTo('/login')
  }
  // favorites에 id가 있으면 → 제거 (filter)
  if (favorites.value.includes(id)) {
    favorites.value = favorites.value.filter((m) => m !== id)
    // 없으면 → 추가 (push)
  } else {
    favorites.value.push(id)
  }
  // 변경 후 → localStorage에 저장
  localStorage.setItem('favorites', JSON.stringify(favorites.value))
}

// 3. 찜 여부 확인 함수
const isFavorite = (id: number) => {
  // favorites에 id가 포함되어 있는지 → boolean 반환
  return favorites.value.includes(id)
}

// 4. export
export const useFavorite = () => {
  return { favorites, toggleFavorite, isFavorite }
}
