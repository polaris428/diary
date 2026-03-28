<script setup lang="ts">
defineProps<{
  question: string;
}>();
</script>

<template>
  <div class="banner">
    <p class="banner__label">오늘의 질문</p>
    <p class="banner__question">{{ question }}</p>
  </div>
</template>

<style scoped>
.banner {
  display: grid;
  gap: 8px;
  padding: 16px 18px;
  border-left: 4px solid var(--color-primary-600);
  background: var(--color-primary-50);
  border-radius: var(--radius-md);
}

.banner__label,
.banner__question {
  margin: 0;
}

.banner__label {
  color: var(--color-primary-600);
  font-size: 14px;
  font-weight: 700;
}

.banner__question {
  font-family: var(--font-serif);
  line-height: 1.7;
}
</style>
