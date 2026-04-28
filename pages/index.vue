<script setup lang="ts">
const authStore = useAuthStore();
const route = useRoute();
const errorMessage = ref("");

// URL 에러 파라미터 처리
if (route.query.error) {
  errorMessage.value = "로그인 중 오류가 발생했습니다. 다시 시도해 주세요.";
}

const handleSignIn = async () => {
  try {
    await authStore.signInWithGoogle();
  } catch (error) {
    console.error(error);
    errorMessage.value = "구글 로그인 창을 여는 데 실패했습니다.";
  }
};
</script>

<template>
  <section class="hero">
    <p class="hero__eyebrow">Private Journal</p>
    <h1>하루를 남기는 가장 단단한 시작점</h1>
    <p class="hero__description">
      당신의 감정은 하나의 예술 작품입니다.<br />
      'The Frame' 갤러리에서 당신의 기록을 전시해 보세요.
    </p>
    <div class="auth-box">
      <BaseButton size="lg" @click="handleSignIn">Google로 시작하기</BaseButton>
      <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>
    </div>
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

.auth-box {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 24px;
}

.error-msg {
  color: #e53935;
  font-size: 14px;
  margin: 0;
}
</style>
