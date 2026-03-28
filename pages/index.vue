<script setup lang="ts">
const authStore = useAuthStore();

const handleSignIn = async () => {
  await authStore.signInWithGoogle();
};
</script>

<template>
  <section class="hero">
    <p class="hero__eyebrow">Private Journal</p>
    <h1>하루를 남기는 가장 단단한 시작점</h1>
    <p class="hero__description">
      Nuxt, Pinia, Supabase 구조 위에 일기 앱의 첫 골격을 올려두었습니다.
    </p>
    <BaseButton size="lg" @click="handleSignIn">Google로 시작하기</BaseButton>
  </section>
</template>

<style scoped>
.hero {
  display: grid;
  gap: 16px;
  align-content: center;
  min-height: calc(100vh - 64px);
  max-width: 640px;
}

.hero h1 {
  margin: 0;
  font-size: clamp(36px, 7vw, 58px);
  line-height: 1.05;
}

.hero__eyebrow {
  margin: 0;
  color: var(--color-primary-600);
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.hero__description {
  margin: 0 0 8px;
  color: var(--color-neutral-700);
  font-size: 18px;
  line-height: 1.7;
}
</style>
