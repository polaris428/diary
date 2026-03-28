<script setup lang="ts">
const modelValue = defineModel<DiaryMood | null>({ default: null });
const moods = DIARY_MOODS;

const toggleMood = (mood: DiaryMood) => {
  modelValue.value = modelValue.value === mood ? null : mood;
};
</script>

<template>
  <div class="grid">
    <button
      v-for="mood in moods"
      :key="mood"
      type="button"
      class="grid__item"
      :class="{ 'grid__item--selected': modelValue === mood }"
      @click="toggleMood(mood)"
    >
      <BaseBadge :mood="mood" />
    </button>
  </div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.grid__item {
  padding: 12px;
  border: 1px solid rgba(75, 46, 31, 0.12);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.8);
  cursor: pointer;
}

.grid__item--selected {
  border-color: var(--color-primary-600);
  box-shadow: inset 0 0 0 1px var(--color-primary-600);
}
</style>
