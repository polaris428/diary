<script setup lang="ts">
const authStore = useAuthStore();

onMounted(async () => {
  await authStore.initSession();
  await navigateTo("/home", { replace: true });
});
</script>

<template>
  <section class="state-page">
    <p>로그인 세션을 확인하는 중입니다.</p>
  </section>
</template>

<style scoped>
.state-page {
  min-height: 60vh;
  display: grid;
  place-items: center;
  color: var(--color-neutral-700);
}
</style>
