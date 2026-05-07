<script setup lang="ts">
import type { DiaryMood } from '~/types';

const diaryWriteStore = useDiaryWriteStore();
const toast = useToast();

const title = ref("");
const content = ref("");
const selectedMood = ref<DiaryMood | null>(null);
const isDirty = ref(false);
const isSubmitting = ref(false);

// 변경 사항 감지
watch([title, content, selectedMood], () => {
  if (content.value.length > 0 || title.value.length > 0 || selectedMood.value) {
    isDirty.value = true;
  }
});

// 페이지 이탈 경고 (새로고침, 탭 닫기)
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
  if (isDirty.value) {
    e.preventDefault();
    e.returnValue = "";
  }
};

onMounted(() => {
  window.addEventListener("beforeunload", handleBeforeUnload);
});

onUnmounted(() => {
  window.removeEventListener("beforeunload", handleBeforeUnload);
});

// 라우터 이동 경고 (내부 페이지 이동)
onBeforeRouteLeave(() => {
  if (isDirty.value) {
    const answer = window.confirm("작성 중인 내용이 저장되지 않았습니다. 정말 나가시겠습니까?");
    if (!answer) return false;
  }
});

const submit = async () => {
  if (!content.value.trim()) return;

  try {
    isSubmitting.value = true;
    await diaryWriteStore.createEntry({
      title: title.value,
      content: content.value.trim(),
      mood: selectedMood.value
    });

    isDirty.value = false; // 저장 완료 시 경고 해제
    await navigateTo("/home");
  } catch (error) {
    toast.show("저장하지 못했어요. 다시 시도해볼게요.", "error");
  } finally {
    isSubmitting.value = false;
  }
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
      <BaseButton :disabled="!content.trim() || isSubmitting" :loading="isSubmitting" @click="submit">저장하기</BaseButton>
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
