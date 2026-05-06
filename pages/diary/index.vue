<script setup lang="ts">
import { computed } from 'vue';
import { useDiaryListStore } from '~/features/diary-list/store/diaryList.store';

const diaryListStore = useDiaryListStore();

const isCurrentMonth = computed(() => {
  const today = new Date();
  return diaryListStore.currentYear === today.getFullYear() && diaryListStore.currentMonth === today.getMonth() + 1;
});

await callOnce("diary:list", async () => {
  await diaryListStore.fetchEntries();
});
</script>

<template>
  <div class="page">
    <AppHeader title="기록" />
    <section class="panel">
      <DiaryMonthNav
        :year="diaryListStore.currentYear"
        :month="diaryListStore.currentMonth"
        :disable-next="isCurrentMonth"
        @prev="diaryListStore.goToPreviousMonth()"
        @next="diaryListStore.goToNextMonth()"
      />
      <BaseEmptyState
        v-if="diaryListStore.entries.length === 0"
        message="선택한 달의 기록이 없습니다."
        action-text="일기 쓰기"
        @action="navigateTo('/write')"
      />
      <div v-else class="card-list">
        <DiaryCard
          v-for="entry in diaryListStore.entries"
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
