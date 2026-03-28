<script setup lang="ts">
const { toast } = useToast();
</script>

<template>
  <Transition name="toast">
    <div v-if="toast" class="toast" :class="`toast--${toast.type}`">
      {{ toast.message }}
    </div>
  </Transition>
</template>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  bottom: 24px;
  transform: translateX(-50%);
  padding: 12px 18px;
  border-radius: 9999px;
  color: var(--color-neutral-0);
  box-shadow: var(--shadow-md);
  z-index: 40;
}

.toast--success {
  background: var(--color-success);
}

.toast--error {
  background: var(--color-error);
}

.toast-enter-active,
.toast-leave-active {
  transition: all 200ms ease;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 12px);
}
</style>
