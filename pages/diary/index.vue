<script setup lang="ts">
const diaryStore = useDiaryStore();

await callOnce("diary:list", async () => {
  await diaryStore.fetchEntries();
});
</script>

<template>
  <div class="page">
    <AppHeader title="기록" />
    <section class="panel">
      <DiaryMonthNav
        :year="2026"
        :month="3"
        :disable-next="true"
        @prev="diaryStore.goToPreviousMonth()"
        @next="diaryStore.goToNextMonth()"
      />
      <BaseEmptyState
        v-if="diaryStore.entries.length === 0"
        message="선택한 달의 기록이 없습니다."
        action-text="일기 쓰기"
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

.panel,
.card-list {
  display: grid;
  gap: 16px;
}
</style>
