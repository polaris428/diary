<script setup lang="ts">
const route = useRoute();
const authStore = useAuthStore();

const publicRoutes = new Set(["/", "/auth/callback"]);
const showBottomNav = computed(
  () => authStore.isLoggedIn && !publicRoutes.has(route.path)
);
</script>

<template>
  <div class="shell">
    <main class="shell__main">
      <slot />
    </main>
    <LayoutAppBottomNav v-if="showBottomNav" />
    <BaseToast />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  padding-bottom: 88px;
}

.shell__main {
  width: min(100%, 960px);
  margin: 0 auto;
  padding: 24px 20px 40px;
}
</style>
