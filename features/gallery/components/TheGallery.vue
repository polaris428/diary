<script setup lang="ts">
/**
 * TheGallery.vue
 * 2D 가로 스크롤 갤러리 환경 및 액자 목록을 총괄하는 컨테이너
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'
import BaseFrame from '~/components/base/BaseFrame.vue'
import { useGalleryLayout, type GalleryItem } from '~/features/gallery/composables/useGalleryLayout'
import type { DiaryEntry } from '~/types'

import gsap from 'gsap'

const props = defineProps<{
  entries: DiaryEntry[]
}>()

const emit = defineEmits<{
  (e: 'dive', entryId: string | number): void
  (e: 'scroll', isScrolled: boolean): void
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

// 가로 마우스 휠 스크롤 지원 (GSAP을 활용한 프리미엄 관성 스크롤)
const containerRef = ref<HTMLElement | null>(null)

const onWheel = (e: WheelEvent) => {
  if (!containerRef.value) return
  
  if (e.deltaY !== 0 && e.deltaX === 0) {
    e.preventDefault()
    
    // 현재 위치에서 휠 회전량만큼 목표치 설정
    const targetScroll = containerRef.value.scrollLeft + (e.deltaY * 1.5)
    
    // GSAP으로 부드러운 가감속(Ease) 적용
    gsap.to(containerRef.value, {
      scrollLeft: targetScroll,
      duration: 0.5,
      ease: 'power2.out',
      overwrite: 'auto'
    })
  }
}

// 스크롤 시 상태 방출 (상태가 변할 때만 딱 한 번씩만 방출하도록 최적화)
let lastIsScrolled = false;
const onScroll = (e: Event) => {
  const target = e.target as HTMLElement;
  const currentScrolled = target.scrollLeft > 15;
  
  if (currentScrolled !== lastIsScrolled) {
    lastIsScrolled = currentScrolled;
    emit('scroll', currentScrolled);
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
  <div class="gallery-container" ref="containerRef" @scroll="onScroll">
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
  background-color: #faf9f8;
  overflow-x: auto;
  overflow-y: hidden;
  perspective: 1000px;
  /* scroll-behavior: smooth; -> 휠 조작 시 무거움을 유발하므로 제거하거나 신중히 사용 */
  -webkit-overflow-scrolling: touch; /* iOS 가속 스크롤 */
}

.gallery-wall {
  height: 100vh;
  min-width: 100vw;
  position: relative;
  padding: 0;
  box-sizing: border-box;
  will-change: transform; /* 하드웨어 가속 유도 */
  
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 0%, rgba(255, 255, 255, 0) 25vh);
  
  border-bottom: 3vh solid #f0eee9;
  box-shadow: inset 0 -30px 60px rgba(0,0,0,0.03);
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
