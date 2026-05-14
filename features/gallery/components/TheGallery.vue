<script setup lang="ts">
/**
 * TheGallery.vue
 * 2D 갤러리 환경 및 액자 목록을 총괄하는 컨테이너
 */
import BaseFrame from '~/components/base/BaseFrame.vue'
import { useGalleryLayout, type GalleryItem } from '~/features/gallery/composables/useGalleryLayout'
import type { DiaryEntry } from '~/types'

const props = defineProps<{
  entries: DiaryEntry[]
}>()

const emit = defineEmits<{
  (e: 'dive', entryId: string | number): void
}>()

// DiaryEntry → GalleryItem 변환
const toGalleryItem = (entry: DiaryEntry): GalleryItem => {
  const meta = getMoodMeta(entry.mood)
  return {
    id: entry.id,
    title: entry.title,
    mood: entry.mood,
    type: meta.frameType,
    canvasColor: meta.canvasColor,
  }
}

const { calculateLayout } = useGalleryLayout()
const placedItems = computed(() => calculateLayout(props.entries.map(toGalleryItem)))

const handleDive = (id: string | number) => {
  emit('dive', id)
}
</script>

<template>
  <div class="gallery-container">
    <div class="gallery-wall">
      <!-- Frames: 감정 스타일이 적용된 실제 일기 데이터 렌더링 -->
      <BaseFrame
        v-for="item in placedItems"
        :key="item.id"
        :position-style="item.style"
        :type="item.type"
        :thumbnail="item.thumbnail"
        :canvas-color="item.canvasColor"
        @click="handleDive(item.id)"
      />
    </div>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: var(--color-gallery-wall, #ffffff);
  overflow-x: hidden;
  overflow-y: auto; /* 스크롤 가능하도록 설정 */
  perspective: 1000px; /* Dive UX를 위한 원근감 설정 */
}

.gallery-wall {
  width: 100%;
  min-height: 200vh; /* 임시 높이: 아이템 개수에 따라 동적 조정 가능 */
  position: relative;
  padding: 40px 20px;
  box-sizing: border-box;
}

/* 스크롤바 숨기기 (선택적) */
.gallery-container::-webkit-scrollbar {
  display: none;
}
.gallery-container {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
</style>
