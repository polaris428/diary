import type {DiaryEntry, DiaryMood} from "~/types";

export const useDiaryStore = defineStore("diary", () => {
  const entries = ref<DiaryEntry[]>([]);
  const currentYear = ref(new Date().getFullYear());
  const currentMonth = ref(new Date().getMonth() + 1);

  const supabase = useSupabaseClient<any>();
  const user = useSupabaseUser();
  const toast = useToast();

  const fetchLatestEntries = async () => {
    if (!user.value) return;

    const { data, error } = await supabase
      .from("entries")
      .select("id, title, mood, created_at")
      .eq("user_id", user.value.id)
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("fetchLatestEntries error:", error);
      return;
    }

    if (data) {
      entries.value = data.map((row: any) => ({
        id: row.id as string,
        title: row.title as string,
        content: "",          // 목록에서는 본문 미조회 (성능 최적화)
        mood: row.mood as DiaryMood | null,
        createdAt: row.created_at as string,
      }));
    }
  };

  const fetchEntries = async () => {
    if (!user.value) return;

    // Calculate start and end dates for the current month
    const startDate = new Date(currentYear.value, currentMonth.value - 1, 1).toISOString();
    const endDate = new Date(currentYear.value, currentMonth.value, 0, 23, 59, 59, 999).toISOString();

    const { data, error } = await supabase
      .from("entries")
      .select("id, title, mood, created_at")
      .eq("user_id", user.value.id)
      .gte("created_at", startDate)
      .lte("created_at", endDate)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("fetchEntries error:", error);
      toast.show("목록을 불러오는 중 오류가 발생했습니다.", "error");
      return;
    }

    if (data) {
      entries.value = data.map((row: any) => ({
        id: row.id as string,
        title: row.title as string,
        content: "",
        mood: row.mood as DiaryMood | null,
        createdAt: row.created_at as string,
      }));
    }
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
        id: data.id as string,
        title: data.title as string,
        content: data.content as string,
        mood: data.mood as DiaryMood | null,
        createdAt: data.created_at as string
      }, ...entries.value];
    }

    useToast().show("일기가 저장되었습니다.", "success");
  };

  const goToPreviousMonth = () => {
    if (currentMonth.value === 1) {
      currentMonth.value = 12;
      currentYear.value--;
    } else {
      currentMonth.value--;
    }
    fetchEntries();
  };

  const goToNextMonth = () => {
    const today = new Date();
    if (currentYear.value === today.getFullYear() && currentMonth.value === today.getMonth() + 1) {
      return; // Prevent going beyond the current month
    }
    if (currentMonth.value === 12) {
      currentMonth.value = 1;
      currentYear.value++;
    } else {
      currentMonth.value++;
    }
    fetchEntries();
  };

  return {
    entries,
    currentYear,
    currentMonth,
    fetchLatestEntries,
    fetchEntries,
    createEntry,
    goToPreviousMonth,
    goToNextMonth
  };
});
