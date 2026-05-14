<script setup lang="ts">
/**
 * TheGallery.vue
 * 2D 가로 스크롤 갤러리 환경 및 액자 목록을 총괄하는 컨테이너
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
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
const layoutData = computed(() => calculateLayout(props.entries.map(toGalleryItem)))
const placedItems = computed(() => layoutData.value.items)

const handleDive = (id: string | number) => {
  emit('dive', id)
}

// 가로 마우스 휠 스크롤 지원
const containerRef = ref<HTMLElement | null>(null)

const onWheel = (e: WheelEvent) => {
  if (!containerRef.value) return
  // 세로 스크롤(deltaY) 발생 시 가로 스크롤로 변환
  if (e.deltaY !== 0 && e.deltaX === 0) {
    e.preventDefault()
    containerRef.value.scrollLeft += e.deltaY * 1.5 // 스크롤 속도 조절
  }
}

onMounted(() => {
  if (containerRef.value) {
    containerRef.value.addEventListener('wheel', onWheel, { passive: false })
  }
})

onUnmounted(() => {
  if (containerRef.value) {
    containerRef.value.removeEventListener('wheel', onWheel)
  }
})
</script>

<template>
  <div class="gallery-container" ref="containerRef">
    <div class="gallery-wall" :style="{ width: layoutData.wallWidth }">
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
  overflow-x: auto;
  overflow-y: hidden; /* 세로 스크롤 금지 */
  perspective: 1000px;
  scroll-behavior: smooth;
}

.gallery-wall {
  height: 100vh;
  min-width: 100vw; /* 기본적으로 화면 너비만큼은 보장 */
  position: relative;
  padding: 0;
  box-sizing: border-box;
  
  /* 벽면 상단에 은은한 조명 효과 (깊이감 부여) */
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 0%, rgba(255, 255, 255, 0) 15vh);
  
  /* 바닥 라인 (공간감 연출) */
  border-bottom: 2vh solid #f5f5f5;
  box-shadow: inset 0 -20px 40px rgba(0,0,0,0.02);
}

/* 스크롤바 커스텀 (미술관 느낌을 살려 아주 얇고 우아하게) */
.gallery-container::-webkit-scrollbar {
  height: 4px;
}
.gallery-container::-webkit-scrollbar-track {
  background: transparent;
}
.gallery-container::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}
.gallery-container::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.2);
}
</style>
