import type { Trip } from "../types/trip.type";
import sampleThumbnail from "@/assets/sample/trip_thumbnail.jpg";

const parseLocalDate = (iso: string) => new Date(iso);

export const MOCK_TRIPS: Trip[] = [
  {
    id: 1,
    folderId: 1,
    title: "도쿄 3박 4일 여행",
    status: "완료",
    startDate: parseLocalDate("2025-09-10"),
    endDate: parseLocalDate("2025-09-15"),
    days: 4,
    destinations: ["도쿄"],
    participants: 3,
    thumbnail: sampleThumbnail,
  },
  {
    id: 2,
    folderId: 3,
    title: "제주도 힐링 여행",
    status: "여행중",
    startDate: parseLocalDate("2025-09-29"),
    endDate: parseLocalDate("2025-10-05"),
    days: 4,
    destinations: ["제주시"],
    participants: 2,
    thumbnail: sampleThumbnail,
  },
  {
    id: 3,
    folderId: 2,
    title: "경주 야경 여행",
    status: "예정",
    startDate: parseLocalDate("2025-10-20"),
    endDate: parseLocalDate("2025-10-24"),
    days: 4,
    destinations: ["경주시"],
    participants: 2,
    thumbnail: sampleThumbnail,
  },
];
