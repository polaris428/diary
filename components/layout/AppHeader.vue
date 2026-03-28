<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title: string;
    showBack?: boolean;
  }>(),
  {
    showBack: false
  }
);
</script>

<template>
  <header class="header">
    <div class="header__left">
      <BaseButton v-if="props.showBack" variant="ghost" size="sm" @click="navigateTo(-1)">
        뒤로
      </BaseButton>
      <h1>{{ props.title }}</h1>
    </div>
    <slot name="right" />
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.header__left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.header h1 {
  margin: 0;
  font-size: 22px;
}
</style>
