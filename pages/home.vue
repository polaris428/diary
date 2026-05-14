<script setup lang="ts">
import { useDiaryListStore } from '~/features/diary-list/store/diaryList.store';
import TheGallery from '~/features/gallery/components/TheGallery.vue'

const diaryListStore = useDiaryListStore();

await useAsyncData("home:latest", async () => {
  await diaryListStore.fetchLatestEntries();
});

const onDive = (id: string | number) => {
  // 2D 다이브 UX: 클릭 시 상세 페이지로 부드럽게 이동
  navigateTo(`/diary/${id}`)
}
</script>

<template>
  <div class="home">
    <!-- 2D 갤러리 뷰 -->
    <TheGallery :entries="diaryListStore.latestEntries" @dive="onDive" />

    <!-- UI 오버레이: 갤러리 위에 떠있는 버튼들 -->
    <div class="ui-overlay">
      <div class="ui-overlay__header">
        <h1 class="ui-overlay__title">The Frame</h1>
        <p class="ui-overlay__hint">자유롭게 스크롤하여 갤러리를 감상하세요.</p>
      </div>

      <BaseEmptyState
        v-if="diaryListStore.latestEntries.length === 0"
        message="아직 전시된 기록이 없습니다."
        action-text="첫 기록 남기기"
        @action="navigateTo('/write')"
      />

      <NuxtLink to="/write" class="fab" aria-label="새 일기 쓰기">
        +
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
.home {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
  z-index: 0;
}

.ui-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
  padding: 32px 20px 100px; /* 하단 네비게이션 공간 고려 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.ui-overlay__header {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.ui-overlay__title {
  margin: 0;
  font-family: var(--font-sans);
  font-size: 1.75rem;
  font-weight: 700;
  color: #121212;
  letter-spacing: -0.02em;
}

.ui-overlay__hint {
  margin: 0;
  font-size: 0.875rem;
  color: #666;
}

/* FAB: 새 일기 쓰기 버튼 */
.fab {
  pointer-events: all;
  align-self: flex-end;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--color-primary-900, #121212);
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.fab:hover {
  transform: scale(1.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>
