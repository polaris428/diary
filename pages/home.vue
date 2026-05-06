<script setup lang="ts">
import { useDiaryListStore } from '~/features/diary-list/store/diaryList.store';
import TheGallery from '~/features/gallery/components/TheGallery.vue'

const diaryListStore = useDiaryListStore();

await callOnce("home:bootstrap", async () => {
  await diaryListStore.fetchLatestEntries();
});
</script>

<template>
  <div class="home">
    <!-- 3D 갤러리 (WebGL은 클라이언트 전용) -->
    <ClientOnly fallback-tag="div" fallback="갤러리를 불러오는 중...">
      <TheGallery :entries="diaryListStore.entries" />
    </ClientOnly>

    <!-- UI 오버레이: 갤러리 위에 떠있는 버튼들 -->
    <div class="ui-overlay">
      <div class="ui-overlay__header">
        <h1 class="ui-overlay__title">The Frame</h1>
        <p class="ui-overlay__hint">드래그하여 공간을 둘러보세요.</p>
      </div>

      <BaseEmptyState
        v-if="diaryListStore.entries.length === 0"
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
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.ui-overlay {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  padding: 32px;
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
  background: var(--color-primary-900);
  color: #fff;
  font-size: 1.75rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  text-decoration: none;
}

.fab:hover {
  transform: scale(1.08);
  box-shadow: 0 18px 36px rgba(75, 46, 31, 0.22);
}
</style>
