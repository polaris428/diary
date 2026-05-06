<script setup lang="ts">
type Variant = "primary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

const props = withDefaults(
  defineProps<{
    variant?: Variant;
    size?: Size;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
  }>(),
  {
    variant: "primary",
    size: "md",
    disabled: false,
    loading: false,
    fullWidth: false
  }
);
</script>

<template>
  <button
    class="button"
    :class="[`button--${props.variant}`, `button--${props.size}`]"
    :disabled="props.disabled || props.loading"
    :style="{ width: props.fullWidth ? '100%' : undefined }"
  >
    <span v-if="props.loading">로딩 중...</span>
    <slot v-else />
  </button>
</template>

<style scoped>
.button {
  border: 0;
  border-radius: 9999px;
  cursor: pointer;
  transition: transform 120ms ease, opacity 120ms ease, background 120ms ease;
}

.button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.button--primary {
  background: var(--color-primary-900);
  color: var(--color-neutral-0);
}

.button--ghost {
  background: transparent;
  color: var(--color-primary-900);
  border: 1px solid rgba(75, 46, 31, 0.18);
}

.button--danger {
  background: var(--color-error);
  color: var(--color-neutral-0);
}

.button--sm {
  padding: 10px 14px;
}

.button--md {
  padding: 12px 18px;
}

.button--lg {
  padding: 16px 22px;
  font-size: 16px;
  font-weight: 700;
}
</style>
