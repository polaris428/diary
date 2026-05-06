<script setup lang="ts">
defineProps<{
  year: number;
  month: number;
  disableNext?: boolean;
}>();

defineEmits<{
  prev: [];
  next: [];
}>();
</script>

<template>
  <div class="nav">
    <BaseButton variant="ghost" size="sm" @click="$emit('prev')">&lt;</BaseButton>
    <strong>{{ year }}년 {{ month }}월</strong>
    <BaseButton
      variant="ghost"
      size="sm"
      :disabled="disableNext"
      @click="$emit('next')"
    >
      &gt;
    </BaseButton>
  </div>
</template>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}
</style>
