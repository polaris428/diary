import type {DiaryEntry} from "~/types";

const MOCK_ENTRIES: DiaryEntry[] = [
  {
    id: "1",
    title: "첫 기록",
    content: "Nuxt 프로젝트 골격을 만들고 화면 흐름을 정리했다.",
    mood: "joy",
    createdAt: "2026-03-29"
  }
];

export const useDiaryStore = defineStore("diary", () => {
  const entries = ref<DiaryEntry[]>([]);

  const fetchLatestEntries = async () => {
    entries.value = MOCK_ENTRIES;
  };

  const fetchEntries = async () => {
    entries.value = MOCK_ENTRIES;
  };

  const createEntry = async (payload: Omit<DiaryEntry, "id" | "createdAt">) => {
    entries.value = [
      {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),
        ...payload
      },
      ...entries.value
    ];

    useToast().show("일기가 저장되었습니다.", "success");
  };

  const goToPreviousMonth = () => undefined;
  const goToNextMonth = () => undefined;

  return {
    entries,
    fetchLatestEntries,
    fetchEntries,
    createEntry,
    goToPreviousMonth,
    goToNextMonth
  };
});
