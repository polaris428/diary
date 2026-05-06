<script setup lang="ts">
import type { DiaryEntry } from '~/types';

const route = useRoute();
const { fetchEntryById } = useDiaryDetail();

const { data: entry, pending: isLoading } = await useAsyncData(
  `diary:detail:${route.params.id}`,
  () => fetchEntryById(String(route.params.id))
);

const handleEdit = () => {
  // 실제 수정 모드 전환 또는 페이지 이동은 5번 기능에서 구현
  window.alert("수정 기능은 곧 준비됩니다!");
};

const handleDelete = () => {
  const isConfirmed = window.confirm("정말 삭제할까요?");
  if (isConfirmed) {
    // 실제 삭제 로직은 6번 기능에서 구현
    window.alert("삭제 로직 연결 대기 중");
  }
};
</script>

<template>
  <div class="page">
    <AppHeader title="상세 보기" :show-back="true">
      <template #right v-if="entry">
        <div class="header-actions">
          <BaseButton variant="ghost" size="sm" @click="handleEdit">수정</BaseButton>
          <BaseButton variant="danger" size="sm" @click="handleDelete">삭제</BaseButton>
        </div>
      </template>
    </AppHeader>
    <section class="panel" v-if="entry">
      <div class="panel__row">
        <h1>{{ entry.title }}</h1>
        <BaseBadge v-if="entry.mood" :mood="entry.mood" />
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

.header-actions {
  display: flex;
  gap: 8px;
}
</style>
