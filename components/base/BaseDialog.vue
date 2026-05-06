<script setup lang="ts">
interface Props {
  show: boolean;
  title: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'primary' | 'danger';
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  confirmText: '확인',
  cancelText: '취소',
  variant: 'primary',
  loading: false
});

const emit = defineEmits<{
  (e: 'confirm'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="show" class="dialog-overlay" @click.self="emit('close')">
        <Transition name="scale">
          <div class="dialog-content">
            <header class="dialog-header">
              <h3>{{ title }}</h3>
            </header>
            
            <div class="dialog-body">
              <slot>{{ message }}</slot>
            </div>
            
            <footer class="dialog-footer">
              <BaseButton 
                variant="ghost" 
                size="md" 
                :disabled="loading"
                @click="emit('close')"
              >
                {{ cancelText }}
              </BaseButton>
              <BaseButton 
                :variant="variant" 
                size="md" 
                :loading="loading"
                :disabled="loading"
                @click="emit('confirm')"
              >
                {{ confirmText }}
              </BaseButton>
            </footer>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.dialog-content {
  background: white;
  width: min(100%, 400px);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-lg);
  padding: 24px;
  display: grid;
  gap: 16px;
}

.dialog-header h3 {
  margin: 0;
  font-size: 20px;
  color: var(--color-neutral-900);
}

.dialog-body {
  font-size: 16px;
  color: var(--color-neutral-600);
  line-height: 1.5;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.scale-enter-from,
.scale-leave-to {
  transform: scale(0.95);
}
</style>
