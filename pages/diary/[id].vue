<script setup lang="ts">
import type { DiaryMood } from '~/types';

const route = useRoute();
const diaryDetailStore = useDiaryDetailStore();
const diaryWriteStore = useDiaryWriteStore();
const toast = useToast();

const { data: entry, pending: isLoading } = await useAsyncData(
  `diary:detail:${route.params.id}`,
  () => diaryDetailStore.fetchEntryById(String(route.params.id))
);

const isEditMode = ref(false);
const isSubmitting = ref(false);
const isDeleteDialogOpen = ref(false);

const editTitle = ref("");
const editContent = ref("");
const editMood = ref<DiaryMood | null>(null);

const startEdit = () => {
  if (!entry.value) return;
  editTitle.value = entry.value.title;
  editContent.value = entry.value.content;
  editMood.value = entry.value.mood;
  isEditMode.value = true;
};

const cancelEdit = () => {
  isEditMode.value = false;
};

const saveEdit = async () => {
  if (isSaveDisabled.value) return;
  
  isSubmitting.value = true;
  try {
    const updatedData = await diaryWriteStore.updateEntry(String(route.params.id), {
      title: editTitle.value,
      content: editContent.value,
      mood: editMood.value,
    });
    
    if (entry.value && updatedData) {
      entry.value.title = updatedData.title;
      entry.value.content = updatedData.content;
      entry.value.mood = updatedData.mood;
      entry.value.createdAt = updatedData.created_at; 
    }
    
    isEditMode.value = false;
  } catch (error: any) {
    console.error(error);
    toast.show("수정하지 못했어요. 다시 시도해주세요.", "error");
  } finally {
    isSubmitting.value = false;
  }
};

const isSaveDisabled = computed(() => {
  return !editTitle.value.trim() || !editContent.value.trim();
});

const handleDelete = () => {
  isDeleteDialogOpen.value = true;
};

const confirmDelete = async () => {
  isSubmitting.value = true;
  try {
    const success = await diaryDetailStore.deleteEntry(String(route.params.id));
    if (success) {
      navigateTo('/diary');
    }
  } finally {
    isSubmitting.value = false;
    isDeleteDialogOpen.value = false;
  }
};
</script>

<template>
  <div class="page">
    <AppHeader title="상세 보기" :show-back="true">
      <template #right>
        <template v-if="entry">
          <div class="header-actions" v-if="!isEditMode">
            <BaseButton variant="ghost" size="sm" @click="startEdit">수정</BaseButton>
            <BaseButton variant="danger" size="sm" @click="handleDelete">삭제</BaseButton>
          </div>
          <div class="header-actions" v-else>
            <BaseButton variant="ghost" size="sm" :disabled="isSubmitting" @click="cancelEdit">취소</BaseButton>
            <BaseButton variant="primary" size="sm" :disabled="isSaveDisabled || isSubmitting" :loading="isSubmitting" @click="saveEdit">저장</BaseButton>
          </div>
        </template>
      </template>
    </AppHeader>
    <section class="panel" v-if="entry">
      <div class="panel__row">
        <h1 v-if="!isEditMode">{{ entry.title }}</h1>
        <input v-else v-model="editTitle" class="edit-title-input" placeholder="제목을 입력하세요" />
        
        <BaseBadge v-if="!isEditMode && entry.mood" :mood="entry.mood" />
      </div>
      <p class="panel__date" v-if="!isEditMode">{{ formatDiaryDate(entry.createdAt) }}</p>
      
      <DiaryMoodPicker v-if="isEditMode" v-model="editMood" />
      
      <BaseTextarea v-if="!isEditMode" :model-value="entry.content" :readonly="true" />
      <BaseTextarea v-else v-model="editContent" :readonly="false" placeholder="본문을 입력하세요" />
    </section>
    <BaseEmptyState
      v-else
      message="해당 일기를 찾을 수 없습니다."
      action-text="목록으로 이동"
      @action="navigateTo('/diary')"
    />

    <BaseDialog
      :show="isDeleteDialogOpen"
      title="정말 삭제할까요?"
      message="한 번 삭제된 일기는 다시 복구할 수 없습니다."
      confirm-text="삭제"
      variant="danger"
      :loading="isSubmitting"
      @close="isDeleteDialogOpen = false"
      @confirm="confirmDelete"
    />
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 20px;
}

.panel {
  display: grid;
  gap: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.86);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
}

.panel__row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.panel__row h1,
.panel__date {
  margin: 0;
}

.edit-title-input {
  flex: 1;
  font-size: 24px;
  font-weight: 700;
  border: none;
  border-bottom: 2px solid var(--color-primary-200);
  padding: 4px 0;
  outline: none;
  background: transparent;
  color: var(--color-neutral-900);
}

.edit-title-input:focus {
  border-bottom-color: var(--color-primary-500);
}

.panel__date {
  color: var(--color-neutral-500);
}

.header-actions {
  display: flex;
  gap: 8px;
}
</style>
