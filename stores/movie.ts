import { defineStore } from 'pinia'
import { movies, genres, type Movie } from '~/data/movies'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: movies as Movie[],
    selectedGenre: '전체' as string,
    searchQuery: '' as string,
  }),

  getters: {
    // 장르별 필터링된 영화 목록
    filteredMovies: (state) => {
      let filtered = state.movies

      // 장르 필터
      if (state.selectedGenre !== '전체') {
        filtered = filtered.filter((movie) => movie.genre === state.selectedGenre)
      }

      // 검색어 필터
      if (state.searchQuery.trim()) {
        const query = state.searchQuery.toLowerCase()
        filtered = filtered.filter(
          (movie) =>
            movie.title.toLowerCase().includes(query) ||
            movie.director.toLowerCase().includes(query) ||
            movie.description.toLowerCase().includes(query)
        )
      }

      return filtered
    },

    // 현재 상영중인 영화만
    nowPlayingMovies: (state) => {
      return state.movies.filter((movie) => movie.isNowPlaying)
    },

    // 상영 종료된 영화만
    pastMovies: (state) => {
      return state.movies.filter((movie) => !movie.isNowPlaying)
    },

    // 장르 목록
    genreList: () => genres,

    // 영화 ID로 영화 찾기
    getMovieById: (state) => {
      return (id: number) => state.movies.find((movie) => movie.id === id)
    },
  },

  actions: {
    // 장르 선택
    setGenre(genre: string) {
      this.selectedGenre = genre
    },

    // 검색어 설정
    setSearchQuery(query: string) {
      this.searchQuery = query
    },

    // 영화 목록 업데이트 (API 연동 시 사용)
    updateMovies(newMovies: Movie[]) {
      this.movies = newMovies
    },
  },
})
