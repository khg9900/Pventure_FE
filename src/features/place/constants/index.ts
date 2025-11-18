export const PLACE_TYPES = [
  "관광",
  "식당",
  "카페",
  "숙박",
  "교통",
  "쇼핑",
  "축제",
  "기타",
] as const;

export type PlaceType = typeof PLACE_TYPES[number];


export const PLACE_TYPE_ICONS: Record<string, string> = {
  관광: "🗺️",
  식당: "🍽️",
  카페: "☕",
  숙박: "🏨",
  교통: "🚌",
  쇼핑: "🛍️",
  축제: "🎉",
  기타: "📌",
};
