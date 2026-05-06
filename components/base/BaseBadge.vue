<script setup lang="ts">
const props = defineProps<{
  mood: DiaryMood | null;
}>();

const moodMeta = computed(() => getMoodMeta(props.mood));
</script>

<template>
  <span class="badge" :style="{ background: moodMeta.background, color: moodMeta.color }">
    {{ moodMeta.emoji }} {{ moodMeta.label }}
  </span>
</template>

<style scoped>
.badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 9999px;
  font-size: 14px;
  font-weight: 700;
}
</style>
