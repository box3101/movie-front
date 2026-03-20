export const useMovieApi = () => {
  const config = useRuntimeConfig() // .env 파일에 저장된 환경 변수 사용
  const apiKey = config.public.tmdbApiKey // .env 파일에 저장된 TMDB API 키 사용
  const baseUrl = 'https://api.themoviedb.org/3' // TMDB API 기본 URL

  // 현재 상영작 목록 조회
  const fetchNowPlayingMovies = async (pageNumber: number) => {
    const data = await $fetch(`${baseUrl}/movie/now_playing`, {
      // 현재 상영작 목록 조회 API 호출 ( 현재 상영작 목록 조회 )
      params: {
        api_key: apiKey, // API 키 전달
        language: 'ko-KR', // 언어 설정 ( 한국어 )
        page: pageNumber, // 페이지 번호
      },
    })
    return data // 현재 상영작 목록 데이터 반환  ( 자동으로 URL 쿼리스트링으로 변환됨 )
  }
  // 영화 상세 정보 조회
  const fetchMovieDetail = async (id: number) => {
    // 영화 상세 정보 조회 API 호출 ( 영화 ID를 기반으로 영화 상세 정보 조회 )
    const data = await $fetch(`${baseUrl}/movie/${id}`, {
      params: {
        api_key: apiKey, // API 키 전달
        language: 'ko-KR', // 언어 설정 ( 한국어 )
      },
    })
    return data // 영화 상세 정보 데이터 반환  ( 자동으로 URL 쿼리스트링으로 변환됨 )
  }

  return { fetchNowPlayingMovies, fetchMovieDetail } // 현재 상영작 목록 조회, 영화 상세 정보 조회 함수 반환
}
