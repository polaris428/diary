import type { DiaryEntry, DiaryMood } from "~/types";

export const useDiaryDetail = () => {
  const supabase = useSupabaseClient<any>();
  const user = useSupabaseUser();
  const toast = useToast();

  const fetchEntryById = async (id: string): Promise<DiaryEntry | null> => {
    if (!user.value) return null;

    const { data, error } = await supabase
      .from("entries")
      .select("id, title, content, mood, created_at")
      .eq("user_id", user.value.id)
      .eq("id", id)
      .single();

    if (error) {
      console.error("fetchEntryById error:", error);
      toast.show("일기를 불러오는 중 오류가 발생했습니다.", "error");
      return null;
    }

    if (data) {
      return {
        id: data.id as string,
        title: data.title as string,
        content: data.content as string,
        mood: data.mood as DiaryMood | null,
        createdAt: data.created_at as string,
      };
    }
    
    return null;
  };

  return {
    fetchEntryById
  };
};
