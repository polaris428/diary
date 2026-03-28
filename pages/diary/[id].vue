<script setup lang="ts">
const route = useRoute();
const diaryStore = useDiaryStore();

const entry = computed(() =>
  diaryStore.entries.find((item) => item.id === String(route.params.id))
);
</script>

<template>
  <div class="page">
    <AppHeader title="상세 보기" :show-back="true" />
    <section class="panel" v-if="entry">
      <div class="panel__row">
        <h1>{{ entry.title }}</h1>
        <BaseBadge :mood="entry.mood" />
      </div>
      <p class="panel__date">{{ formatDiaryDate(entry.createdAt) }}</p>
      <BaseTextarea :model-value="entry.content" :readonly="true" />
    </section>
    <BaseEmptyState
      v-else
      message="해당 일기를 찾을 수 없습니다."
      action-text="목록으로 이동"
      @action="navigateTo('/diary')"
    />
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
}

.panel {
  display: grid;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.panel__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.panel__row h1,
.panel__date {
  margin: 0;
}

.panel__date {
  color: var(--color-neutral-500);
}
</style>
