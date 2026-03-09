<template>
  <header>
    사이트 이름
  </header>
  <nav>
    <ul>
      <li>
        <NuxtLink to="/">홈</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/movies">영화</NuxtLink>
      </li>
      <li>
        <NuxtLink to="/about">소개</NuxtLink>
      </li>
    </ul>
  </nav>
  <div>
    <slot />
  </div>
</template>