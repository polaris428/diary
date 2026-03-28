<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <div class="page">
    <AppHeader title="설정" />
    <section class="panel">
      <p>기본 환경 설정과 로그아웃 진입점을 배치할 화면입니다.</p>
      <BaseButton variant="ghost" @click="authStore.signOut()">
        로그아웃
      </BaseButton>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
}

.panel {
  display: grid;
  gap: 16px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.panel p {
  margin: 0;
}
</style>
