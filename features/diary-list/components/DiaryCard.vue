<script setup lang="ts">
import type { DiaryEntry } from '~/types';
defineProps<{
  entry: DiaryEntry;
}>();
</script>

<template>
  <NuxtLink :to="`/diary/${entry.id}`" class="card">
    <div class="card__row">
      <strong>{{ entry.title }}</strong>
      <BaseBadge :mood="entry.mood" />
    </div>
    <p class="card__date">{{ formatDiaryDate(entry.createdAt) }}</p>
    <p class="card__content">{{ entry.content.slice(0, 40) }}</p>
  </NuxtLink>
</template>

<style scoped>
.card {
  display: grid;
  gap: 10px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.84);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: transform 120ms ease, box-shadow 120ms ease;
}

.card:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

.card__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.card__date,
.card__content {
  margin: 0;
}

.card__date {
  color: var(--color-neutral-500);
  font-size: 14px;
}

.card__content {
  color: var(--color-neutral-700);
}
</style>
