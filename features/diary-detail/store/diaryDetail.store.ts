import { defineStore } from "pinia";
import type { DiaryEntry, DiaryMood } from "~/types";

export const useDiaryDetailStore = defineStore("diary-detail", () => {
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
      toast.show("기록을 찾을 수 없어요.", "error");
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

  const deleteEntry = async (id: string) => {
    if (!user.value) return false;

    const { error } = await supabase
      .from("entries")
      .delete()
      .eq("id", id)
      .eq("user_id", user.value.id);

    if (error) {
      console.error("deleteEntry error:", error);
      toast.show("삭제하지 못했어요. 다시 시도해주세요.", "error");
      return false;
    }

    toast.show("삭제됐어요.", "success");
    return true;
  };

  return {
    fetchEntryById,
    deleteEntry,
  };
});
