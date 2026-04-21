<script setup lang="ts">
/**
 * BaseFrame.vue
 * 갤러리 벽면에 배치되는 3D 액자 오브제
 */

const props = defineProps<{
  position: [number, number, number]
  type?: 'Classic Gold' | 'Modern Black' | 'Natural Wood' | 'Floating Glass'
  thumbnail?: string
}>()

const width = 1.2
const height = 1.6
const depth = 0.1

const getMaterialProps = () => {
  switch (props.type) {
    case 'Classic Gold':
      return { color: '#c79e77', roughness: 0.2, metalness: 0.8 }
    case 'Natural Wood':
      return { color: '#8f5f3a', roughness: 0.8, metalness: 0.1 }
    case 'Floating Glass':
      return { color: '#ffffff', roughness: 0.0, metalness: 0.1, transparent: true, opacity: 0.3 }
    case 'Modern Black':
    default:
      return { color: '#121212', roughness: 0.6, metalness: 0.3 }
  }
}
</script>

<template>
  <TresGroup :position="props.position">
    <!-- Frame -->
    <TresMesh cast-shadow v-if="props.type !== 'Floating Glass'">
      <TresBoxGeometry :args="[width, height, depth]" />
      <TresMeshStandardMaterial v-bind="getMaterialProps()" />
    </TresMesh>
    
    <!-- Glass for floating -->
    <TresMesh cast-shadow v-else>
       <TresBoxGeometry :args="[width, height, depth]" />
       <TresMeshPhysicalMaterial v-bind="getMaterialProps()" :transmission="0.9" :ior="1.5" />
    </TresMesh>

    <!-- Canvas (Thumbnail) -->
    <!-- 액자 가장자리(0.2)를 제외한 영역 캔버스 -->
    <TresMesh :position="[0, 0, depth / 2 + 0.01]">
      <TresPlaneGeometry :args="[width - 0.2, height - 0.2]" />
      <TresMeshStandardMaterial :color="thumbnail ? '#ffffff' : '#e0e0e0'" />
    </TresMesh>
  </TresGroup>
</template>
