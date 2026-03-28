export const useDiary = () => {
  const diaryStore = useDiaryStore();

  return {
    ...storeToRefs(diaryStore),
    fetchLatestEntries: diaryStore.fetchLatestEntries,
    fetchEntries: diaryStore.fetchEntries,
    createEntry: diaryStore.createEntry
  };
};
