<script setup lang="ts">
/**
 * BaseFrame.vue
 * 갤러리 벽면에 배치되는 2D 액자 컴포넌트
 */

const props = defineProps<{
  type?: 'Classic Gold' | 'Modern Black' | 'Natural Wood' | 'Floating Glass'
  thumbnail?: string
  canvasColor?: string  // 감정 배경색
  positionStyle?: Record<string, any>
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

// 썸네일이 없을 때: 감정 canvasColor, 그것도 없으면 크림색 기본값
const resolvedCanvasColor = computed(() =>
  props.thumbnail ? 'transparent' : (props.canvasColor ?? '#f5f0eb')
)

const frameClasses = computed(() => {
  return [
    'base-frame',
    `frame-${(props.type || 'Modern Black').toLowerCase().replace(' ', '-')}`
  ]
})
</script>

<template>
  <div :class="frameClasses" :style="positionStyle" @click="emit('click')" role="button" aria-label="일기 보기">
    <div class="frame-inner" :style="{ backgroundColor: resolvedCanvasColor }">
      <img v-if="props.thumbnail" :src="props.thumbnail" class="frame-thumbnail" alt="" />
    </div>
  </div>
</template>

<style scoped>
.base-frame {
  position: absolute;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), box-shadow 0.3s ease;
  will-change: transform;
}

.base-frame:hover {
  transform: scale(1.05) !important;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2), 0 8px 16px rgba(0, 0, 0, 0.15);
  z-index: 100 !important; /* 호버 시 가장 위로 */
}

.frame-inner {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 2px 10px rgba(0,0,0,0.1); /* Inner shadow for depth */
}

.frame-thumbnail {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 프레임 스타일 */
.frame-classic-gold {
  padding: 12px;
  background: linear-gradient(135deg, #d4af37 0%, #aa771c 50%, #d4af37 100%);
  border: 2px solid #8a5a19;
}

.frame-modern-black {
  padding: 8px;
  background-color: #1a1a1a;
  border: 1px solid #000;
}

.frame-natural-wood {
  padding: 14px;
  background-color: #8B5A2B;
  background-image: linear-gradient(90deg, rgba(255,255,255,.07) 50%, transparent 50%),
  linear-gradient(90deg, rgba(255,255,255,.13) 50%, transparent 50%),
  linear-gradient(90deg, transparent 50%, rgba(255,255,255,.17) 50%),
  linear-gradient(90deg, transparent 50%, rgba(255,255,255,.19) 50%);
  background-size: 13px, 29px, 37px, 53px;
}

.frame-floating-glass {
  padding: 0;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}
.frame-floating-glass .frame-inner {
  margin: 10px;
  width: calc(100% - 20px);
  height: calc(100% - 20px);
}
</style>
