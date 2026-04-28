<script setup lang="ts">
/**
 * pages/auth/callback.vue
 * 구글 로그인 리다이렉트 처리 및 세션 확인 페이지
 */
const user = useSupabaseUser();

// 세션이 확인되면 /home으로 이동, 실패 시 에러와 함께 인덱스로 이동
watch(user, () => {
  if (user.value) {
    return navigateTo("/home");
  }
}, { immediate: true });

// 5초 후에도 응답이 없으면 에러 처리
onMounted(() => {
  setTimeout(() => {
    if (!user.value) {
      navigateTo("/?error=timeout");
    }
  }, 5000);
});
</script>

<template>
  <div class="callback-container">
    <div class="loader"></div>
    <p>갤러리 입장권을 확인 중입니다...</p>
  </div>
</template>

<style scoped>
.callback-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
}

.loader {
  width: 40px;
  height: 40px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #121212;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

p {
  font-family: 'Pretendard', sans-serif;
  font-size: 16px;
  color: #666;
}
</style>
