<script setup lang="ts">
defineProps<{
  message: string;
  actionText?: string;
}>();

defineEmits<{
  action: [];
}>();
</script>

<template>
  <div class="empty">
    <p>{{ message }}</p>
    <BaseButton v-if="actionText" variant="ghost" @click="$emit('action')">
      {{ actionText }}
    </BaseButton>
  </div>
</template>

<style scoped>
.empty {
  display: grid;
  justify-items: center;
  gap: 16px;
  padding: 32px 20px;
  border: 1px dashed rgba(75, 46, 31, 0.2);
  border-radius: var(--radius-lg);
  color: var(--color-neutral-700);
  text-align: center;
}

.empty p {
  margin: 0;
}
</style>
