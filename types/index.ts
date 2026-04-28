export const DIARY_MOODS = [
  "joy",
  "calm",
  "complex",
  "tired",
  "anxious",
  "sad"
] as const;

export type DiaryMood = typeof DIARY_MOODS[number];

export type DiaryEntry = {
  id: string;
  title: string;
  content: string;
  mood: DiaryMood | null;
  createdAt: string;
};

export type MoodMeta = {
  label: string;
  emoji: string;
  background: string;
  color: string;
};
