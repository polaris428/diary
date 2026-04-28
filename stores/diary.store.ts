import type {DiaryEntry} from "~/types";

export const useDiaryStore = defineStore("diary", () => {
  const entries = ref<DiaryEntry[]>([]);
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const fetchLatestEntries = async () => {
    // 기능 03, 04 구현 시 수정 예정
  };

  const fetchEntries = async () => {
    // 기능 03, 04 구현 시 수정 예정
  };

  const createEntry = async (payload: Omit<DiaryEntry, "id" | "createdAt">) => {
    if (!user.value) {
      throw new Error("로그인이 필요합니다.");
    }

    const { data, error } = await supabase
      .from("entries")
      .insert({
        title: payload.title,
        content: payload.content,
        mood: payload.mood,
        user_id: user.value.id
      })
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error("일기 저장에 실패했습니다.");
    }

    if (data) {
      // 서버에서 반환된 데이터(id, created_at 포함)를 스토어에 추가
      entries.value = [{
        id: data.id,
        title: data.title,
        content: data.content,
        mood: data.mood,
        createdAt: data.created_at
      }, ...entries.value];
    }

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
