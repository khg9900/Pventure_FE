export const TIME_SLOTS = [
  "새벽",
  "아침식사",
  "오전",
  "점심식사",
  "오후",
  "저녁식사",
  "밤",
] as const;

export const TIME_SLOT_ICONS: Record<string, string> = {
  새벽: "🏙️",
  아침식사: "🍞",
  오전: "🏞️",
  점심식사: "🍜",
  오후: "🌆",
  저녁식사: "🍽️",
  밤: "🌠",
};
