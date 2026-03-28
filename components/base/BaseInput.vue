<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });

defineProps<{
  placeholder?: string;
  error?: string;
}>();
</script>

<template>
  <label class="field">
    <input v-model="modelValue" class="field__control" :placeholder="placeholder" />
    <span v-if="error" class="field__error">{{ error }}</span>
  </label>
</template>

<style scoped>
.field {
  display: grid;
  gap: 8px;
}

.field__control {
  width: 100%;
  padding: 14px 16px;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(75, 46, 31, 0.12);
  border-radius: var(--radius-md);
  outline: none;
}

.field__control:focus {
  border-color: var(--color-primary-600);
}

.field__error {
  color: var(--color-error);
  font-size: 14px;
}
</style>
