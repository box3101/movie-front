/**
 * 영화 Mock 데이터
 * - 실제 API 연동 전까지 사용하는 더미 데이터
 * - 나중에 API 응답 형식에 맞춰 interface 수정 예정
 */

// 영화 데이터 타입 정의
export interface Movie {
  id: number // 영화 고유 ID
  title: string // 영화 제목
  genre: string // 장르 (액션, SF, 드라마 등)
  rating: number // 평점 (10점 만점)
  releaseDate: string // 개봉일 (YYYY-MM-DD)
  duration: number // 상영시간 (분)
  director: string // 감독
  description: string // 영화 소개
  poster: string // 포스터 이미지 URL
  isNowPlaying: boolean // 현재 상영중 여부
}

// 영화 목록 (Mock)
export const movies: Movie[] = [
  {
    id: 1,
    title: '범죄도시 4',
    genre: '액션',
    rating: 8.5,
    releaseDate: '2024-04-24',
    duration: 109,
    director: '허명행',
    description: '괴물형사 마석도가 또다시 거대한 범죄 조직을 상대한다.',
    poster: 'https://picsum.photos/seed/movie1/300/450',
    isNowPlaying: true,
  },
  {
    id: 2,
    title: '듄: 파트 2',
    genre: 'SF',
    rating: 9.0,
    releaseDate: '2024-02-28',
    duration: 166,
    director: '드니 빌뇌브',
    description: '아라키스 행성에서 펼쳐지는 폴 아트레이드의 운명적 여정.',
    poster: 'https://picsum.photos/seed/movie2/300/450',
    isNowPlaying: true,
  },
  {
    id: 31,
    title: '파묘',
    genre: '미스터리',
    rating: 8.8,
    releaseDate: '2024-02-22',
    duration: 134,
    director: '장재현',
    description: '풍수사와 장의사, 무당이 수상한 묘를 이장하며 벌어지는 이야기.',
    poster: 'https://picsum.photos/seed/movie3/300/450',
    isNowPlaying: true,
  },
  {
    id: 4,
    title: '인사이드 아웃 2',
    genre: '애니메이션',
    rating: 8.2,
    releaseDate: '2024-06-12',
    duration: 96,
    director: '켈시 만',
    description: '라일리의 새로운 감정들이 등장하며 벌어지는 성장 이야기.',
    poster: 'https://picsum.photos/seed/movie4/300/450',
    isNowPlaying: true,
  },
  {
    id: 5,
    title: '탈주',
    genre: '액션',
    rating: 7.9,
    releaseDate: '2024-07-03',
    duration: 94,
    director: '이종필',
    description: '북에서 남으로, 목숨을 건 탈주가 시작된다.',
    poster: 'https://picsum.photos/seed/movie5/300/450',
    isNowPlaying: true,
  },
  {
    id: 6,
    title: '서울의 봄',
    genre: '드라마',
    rating: 9.2,
    releaseDate: '2023-11-22',
    duration: 141,
    director: '김성수',
    description: '1979년 12월 12일, 대한민국의 운명을 바꾼 그날의 이야기.',
    poster: 'https://picsum.photos/seed/movie6/300/450',
    isNowPlaying: false,
  },
  {
    id: 7,
    title: '웡카',
    genre: '판타지',
    rating: 7.5,
    releaseDate: '2024-01-31',
    duration: 116,
    director: '폴 킹',
    description: '초콜릿 공장의 시작, 윌리 웡카의 꿈과 모험.',
    poster: 'https://picsum.photos/seed/movie7/300/450',
    isNowPlaying: false,
  },
  {
    id: 8,
    title: '쿵푸팬더 4',
    genre: '애니메이션',
    rating: 7.3,
    releaseDate: '2024-04-10',
    duration: 94,
    director: '마이크 미첼',
    description: '포가 새로운 악당과 맞서 싸우는 모험.',
    poster: 'https://picsum.photos/seed/movie8/300/450',
    isNowPlaying: false,
  },
]

// 장르 목록 (movies에서 중복 제거 후 추출, '전체' 포함)
export const genres = ['전체', ...new Set(movies.map((m) => m.genre))]
