// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // 기존 설정 유지하고, runtimeConfig 추가
  runtimeConfig: {
    // 서버에서만 접근
    tmdbApiKey: '',
    // 클라이언트에서도 접근
    public: {
      // TMDB API 키를 환경변수(.env)에서 가져와서 클라이언트에서 접근 가능하도록 설정
      // process.env.TMDB_API_KEY는 .env 파일의 TMDB_API_KEY 값을 읽어옴
      tmdbApiKey: process.env.TMDB_API_KEY,
    },
  },
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: '무비무비 - 영화 예매',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
      link: [
        {
          rel: 'stylesheet',
          href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
        },
      ],
    },
  },
})
