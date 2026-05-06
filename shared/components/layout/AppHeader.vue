<script setup lang="ts">
const router = useRouter();

const props = withDefaults(
  defineProps<{
    title: string;
    showBack?: boolean;
  }>(),
  {
    showBack: false
  }
);

const handleBack = () => {
  if (window.history.length > 1) {
    router.back();
  } else {
    navigateTo("/diary");
  }
};
</script>

<template>
  <header class="header">
    <div class="header__left">
      <BaseButton v-if="props.showBack" variant="ghost" size="sm" @click="handleBack">
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
