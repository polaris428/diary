<script setup lang="ts">
const modelValue = defineModel<string>({ default: "" });

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    maxLength?: number;
    showCounter?: boolean;
    readonly?: boolean;
  }>(),
  {
    placeholder: "",
    maxLength: 5000,
    showCounter: false,
    readonly: false
  }
);
</script>

<template>
  <label class="field">
    <textarea
      v-model="modelValue"
      class="field__control"
      :placeholder="props.placeholder"
      :maxlength="props.maxLength"
      :readonly="props.readonly"
      rows="10"
    />
    <span v-if="props.showCounter" class="field__counter">
      {{ modelValue.length }} / {{ props.maxLength }}
    </span>
  </label>
</template>

<style scoped>
.field {
  display: grid;
  gap: 8px;
}

.field__control {
  width: 100%;
  min-height: 200px;
  padding: 16px;
  resize: vertical;
  border: 1px solid rgba(75, 46, 31, 0.12);
  border-radius: var(--radius-md);
  background: rgba(255, 255, 255, 0.88);
  color: var(--color-neutral-900);
  font-family: var(--font-serif);
  line-height: 1.7;
  outline: none;
}

.field__control:focus {
  border-color: var(--color-primary-600);
}

.field__counter {
  justify-self: end;
  color: var(--color-neutral-500);
  font-size: 12px;
}
</style>
