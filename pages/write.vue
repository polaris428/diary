<script setup lang="ts">
const diaryStore = useDiaryStore();

const title = ref("");
const content = ref("");
const selectedMood = ref<DiaryMood | null>(null);

const submit = async () => {
  await diaryStore.createEntry({
    title: title.value,
    content: content.value,
    mood: selectedMood.value
  });

  await navigateTo("/home");
};
</script>

<template>
  <div class="page">
    <AppHeader title="일기 쓰기" :show-back="true" />
    <section class="panel">
      <BaseInput v-model="title" placeholder="오늘의 제목" />
      <DiaryMoodPicker v-model="selectedMood" />
      <DiaryQuestionBanner :question="useQuestion().question.value" />
      <BaseTextarea
        v-model="content"
        placeholder="오늘 하루를 적어보세요."
        :show-counter="true"
      />
      <BaseButton :disabled="!content.trim()" @click="submit">저장하기</BaseButton>
    </section>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
}

.panel {
  display: grid;
  gap: 16px;
}
</style>
