<script setup lang="ts">
const diaryStore = useDiaryStore();

await callOnce("home:bootstrap", async () => {
  await diaryStore.fetchLatestEntries();
});
</script>

<template>
  <div class="page">
    <AppHeader title="홈" />
    <section class="panel">
      <p class="panel__label">오늘의 질문</p>
      <DiaryQuestionBanner :question="useQuestion().question.value" />
    </section>
    <section class="panel">
      <div class="panel__row">
        <h2>최근 기록</h2>
        <NuxtLink to="/write">새 일기 쓰기</NuxtLink>
      </div>
      <BaseEmptyState
        v-if="diaryStore.entries.length === 0"
        message="아직 작성된 일기가 없습니다."
        action-text="첫 일기 쓰기"
        @action="navigateTo('/write')"
      />
      <div v-else class="card-list">
        <DiaryCard
          v-for="entry in diaryStore.entries"
          :key="entry.id"
          :entry="entry"
        />
      </div>
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
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(143, 95, 58, 0.12);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  backdrop-filter: blur(16px);
}

.panel__label,
.panel h2 {
  margin: 0;
}

.panel__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.card-list {
  display: grid;
  gap: 12px;
}
</style>
