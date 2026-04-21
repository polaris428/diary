<script setup lang="ts">
/**
 * pages/gallery.vue
 * 3D 갤러리 전시관 진입 페이지
 */
import TheGallery from '~/features/gallery/components/TheGallery.vue'
import type { GalleryItem } from '~/features/gallery/composables/useGalleryLayout'

// 1차 MVP 테스트를 위한 목업 데이터
const mockItems: GalleryItem[] = Array.from({ length: 8 }, (_, i) => ({
  id: `mock-${i}`,
  title: `기록 ${i + 1}`,
  // 홀수 인덱스만 텍스처 URL을 임시로 넣는다고 가정 (추후 실제 이미지 연결 시 대비)
  thumbnail: i % 2 === 0 ? undefined : 'placeholder'
}))

definePageMeta({
  layout: 'default' // 전시 모드에서는 AppHeader가 숨겨지도록 추후 레이아웃 조정
})
</script>

<template>
  <div>
    <!-- TheGallery 컴포넌스테 목업 데이터 주입 (WebGL은 클라이언트 전용) -->
    <ClientOnly fallback-tag="div" fallback="Loading 3D Museum...">
      <TheGallery :items="mockItems" />
    </ClientOnly>
    
    <div class="ui-overlay">
      <h1>The Frame</h1>
      <p>드래그하여 공간을 둘러보세요.</p>
    </div>
  </div>
</template>

<style scoped>
.ui-overlay {
  position: absolute;
  top: 40px;
  left: 40px;
  pointer-events: none;
  z-index: 10;
}

.ui-overlay h1 {
  font-family: 'Pretendard', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  color: #121212;
  margin-bottom: 8px;
}

.ui-overlay p {
  font-size: 1rem;
  color: #666;
}
</style>
