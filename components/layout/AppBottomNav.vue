<script setup lang="ts">
const route = useRoute();

const items = [
  { label: "홈", to: "/home" },
  { label: "기록", to: "/diary" },
  { label: "설정", to: "/settings" }
];
</script>

<template>
  <nav class="bottom-nav">
    <NuxtLink
      v-for="item in items"
      :key="item.to"
      :to="item.to"
      class="bottom-nav__item"
      :class="{ 'bottom-nav__item--active': route.path.startsWith(item.to) }"
    >
      {{ item.label }}
    </NuxtLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  left: 50%;
  bottom: 18px;
  display: flex;
  gap: 8px;
  width: min(calc(100% - 24px), 420px);
  padding: 8px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(75, 46, 31, 0.12);
  border-radius: 9999px;
  box-shadow: var(--shadow-md);
  backdrop-filter: blur(14px);
  transform: translateX(-50%);
}

.bottom-nav__item {
  flex: 1;
  padding: 12px;
  border-radius: 9999px;
  color: var(--color-neutral-500);
  text-align: center;
}

.bottom-nav__item--active {
  background: var(--color-primary-900);
  color: var(--color-neutral-0);
}
</style>
