<script setup lang="ts">
/**
 * TheGallery.vue
 * TresJS 캔버스와 전시관 환경, 조명, 액자 목록을 총괄하는 컴포넌트
 */
import { OrbitControls } from '@tresjs/cientos'
import BaseFrame from '~/components/base/BaseFrame.vue'
import { useGalleryLayout, type GalleryItem } from '~/features/gallery/composables/useGalleryLayout'
import type { DiaryEntry } from '~/types'

const props = defineProps<{
  entries: DiaryEntry[]
}>()

// DiaryEntry → GalleryItem 변환 (mood에서 frameType, canvasColor 추출)
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
</script>

<template>
  <div class="gallery-container">
    <TresCanvas clear-color="#ffffff" shadows alpha window-size>
      <TresPerspectiveCamera :position="[0, 3, 10]" :look-at="[0, 3, 0]" />
      
      <OrbitControls />

      <!-- Lighting: 조명 정책 반영 -->
      <TresAmbientLight :intensity="0.6" />
      <TresDirectionalLight :position="[2, 8, 4]" :intensity="1.2" cast-shadow />

      <!-- Floor: 매끄러운 반사 바닥 -->
      <TresMesh :rotation="[-Math.PI / 2, 0, 0]" receive-shadow>
        <TresPlaneGeometry :args="[40, 40]" />
        <TresMeshStandardMaterial color="#fdfdfd" :roughness="0.1" :metalness="0.1" />
      </TresMesh>

      <!-- Wall: 정제된 화이트 큐브 전시벽 -->
      <TresMesh :position="[0, 5, -5]" receive-shadow>
        <TresBoxGeometry :args="[40, 15, 0.5]" />
        <TresMeshStandardMaterial color="#ffffff" />
      </TresMesh>

      <!-- Frames: 감정 스타일이 적용된 실제 일기 데이터 렌더링 -->
      <BaseFrame
        v-for="item in placedItems"
        :key="item.id"
        :position="item.position"
        :type="item.type"
        :thumbnail="item.thumbnail"
        :canvas-color="item.canvasColor"
      />
    </TresCanvas>
  </div>
</template>

<style scoped>
.gallery-container {
  width: 100%;
  height: 100vh;
  position: relative;
  background-color: #ffffff;
}
</style>
