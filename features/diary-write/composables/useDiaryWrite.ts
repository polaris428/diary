import type { DiaryEntry } from "~/types";

export const useDiaryWrite = () => {
  const supabase = useSupabaseClient<any>();
  const user = useSupabaseUser();
  const toast = useToast();

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

    toast.show("일기가 저장되었습니다.", "success");
    return data;
  };

  const updateEntry = async (id: string, payload: Partial<Omit<DiaryEntry, "id" | "createdAt">>) => {
    if (!user.value) {
      throw new Error("로그인이 필요합니다.");
    }

    const updates: any = {};
    if (payload.title !== undefined) updates.title = payload.title;
    if (payload.content !== undefined) updates.content = payload.content;
    if (payload.mood !== undefined) updates.mood = payload.mood;

    const { data, error } = await supabase
      .from("entries")
      .update(updates)
      .eq("id", id)
      .eq("user_id", user.value.id) // RLS check, though DB handles it
      .select()
      .single();

    if (error) {
      console.error("Supabase update error:", error);
      throw new Error("일기 수정에 실패했습니다.");
    }

    toast.show("일기가 수정되었습니다.", "success");
    return data;
  };

  return {
    createEntry,
    updateEntry
  };
};
