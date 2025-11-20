import type { PlaceResponseDto } from "@/features/place/types/place";

export const mockPlaceData: PlaceResponseDto[] = [
  {
    id: 1,
    name: "경복궁",
    address: "서울특별시 종로구 사직로 161",
    links: [
      "https://www.instagram.com/경복궁",
      "https://map.naver.com/v5/entry/place/12345"
    ],
    latitude: 37.577601,
    longitude: 126.976992,
    placeType: "관광",
  },
  {
    id: 2,
    name: "남산타워",
    address: "서울특별시 용산구 남산공원길 105",
    links: [
      "https://www.instagram.com/남산타워",
      "https://map.naver.com/v5/entry/place/67890"
    ],
    latitude: 37.551233,
    longitude: 126.988205,
    placeType: "관광",
  },
  {
    id: 3,
    name: "북촌한옥마을",
    address: "서울특별시 종로구 북촌로 37-1",
    links: [
      "https://www.instagram.com/북촌한옥마을",
      "https://map.naver.com/v5/entry/place/23456"
    ],
    latitude: 37.582779,
    longitude: 126.983248,
    placeType: "관광",
  },
];
