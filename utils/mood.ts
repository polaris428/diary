import { type DiaryMood, type MoodMeta } from "~/types";


const MOOD_META: Record<DiaryMood | "unknown", MoodMeta> = {
  joy: { label: "기쁨", emoji: "😊", background: "#fff0b8", color: "#8a6700" },
  calm: { label: "평온", emoji: "😌", background: "#dff7ed", color: "#217a56" },
  complex: { label: "복잡함", emoji: "😐", background: "#ececec", color: "#555555" },
  tired: { label: "피곤함", emoji: "😴", background: "#efe4ff", color: "#6f51a3" },
  anxious: { label: "불안함", emoji: "😟", background: "#ffe1e1", color: "#b43f3f" },
  sad: { label: "슬픔", emoji: "😢", background: "#e0ebff", color: "#35598c" },
  unknown: { label: "미선택", emoji: "•", background: "#ececec", color: "#555555" }
};

export const getMoodMeta = (mood: DiaryMood | null): MoodMeta =>
  mood ? MOOD_META[mood] : MOOD_META.unknown;
