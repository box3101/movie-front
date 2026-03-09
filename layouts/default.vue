<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <AppHeader />
    <main class="flex-1 max-w-[1200px] mx-auto px-4">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
