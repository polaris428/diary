import { type DiaryMood, type MoodMeta } from "~/types";


const MOOD_META: Record<DiaryMood | "unknown", MoodMeta> = {
  joy:     { label: "기쁨",   emoji: "😊", background: "#fff0b8", color: "#8a6700", frameType: "Classic Gold",    canvasColor: "#fff8e0" },
  calm:    { label: "평온",   emoji: "😌", background: "#dff7ed", color: "#217a56", frameType: "Natural Wood",    canvasColor: "#ecfaf3" },
  complex: { label: "복잡함", emoji: "😐", background: "#ececec", color: "#555555", frameType: "Modern Black",    canvasColor: "#f0f0f0" },
  tired:   { label: "피곤함", emoji: "😴", background: "#efe4ff", color: "#6f51a3", frameType: "Floating Glass",  canvasColor: "#f5eeff" },
  anxious: { label: "불안함", emoji: "😟", background: "#ffe1e1", color: "#b43f3f", frameType: "Modern Black",    canvasColor: "#fff0f0" },
  sad:     { label: "슬픔",   emoji: "😢", background: "#e0ebff", color: "#35598c", frameType: "Natural Wood",    canvasColor: "#edf3ff" },
  unknown: { label: "미선택", emoji: "•",  background: "#ececec", color: "#555555", frameType: "Classic Gold",    canvasColor: "#f5f0eb" },
};

export const getMoodMeta = (mood: DiaryMood | null): MoodMeta =>
  mood ? MOOD_META[mood] : MOOD_META.unknown;
