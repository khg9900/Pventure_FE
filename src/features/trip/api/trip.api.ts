import type { Trip } from "@/features/trip/types/trip.type";
import type { TripResponseDto } from "@/features/trip/types/trip.dto";
import type {
  TripCreatePayload,
  TripUpdatePayload,
} from "@/features/trip/types/trip.payload";

import { MOCK_TRIPS } from "@/features/trip/mock/trips.mock";

/* ======================
 * 조회
 * ====================== */

export const getTrips = async (): Promise<Trip[]> => {
  // TODO: 실제 API 연동
  return [];
};

export const getTripDetail = async (
  tripId: number
): Promise<TripResponseDto> => {
  const trip = MOCK_TRIPS.find((t) => t.id === tripId);
  if (!trip) throw new Error(`Trip with id ${tripId} not found`);

  return {
    id: trip.id,
    title: trip.title,
    region: trip.destinations[0] ?? "",
    status: trip.status,
    startDate: trip.startDate?.toISOString() ?? null,
    endDate: trip.endDate?.toISOString() ?? null,
    days:
      trip.startDate && trip.endDate
        ? Math.round(
            (trip.endDate.getTime() - trip.startDate.getTime()) /
              (1000 * 60 * 60 * 24)
          ) + 1
        : undefined,
    thumbnail: trip.thumbnail ?? null,
    destinations: trip.destinations,
    participants: trip.participants,
    folderId: trip.folderId,
  };
};

/* ======================
 * 생성
 * ====================== */

export const createTrip = async (
  payload: TripCreatePayload
): Promise<Trip> => {
  // 실제 연동 시:
  // const fd = new FormData();
  // Object.entries(payload).forEach(([k, v]) => {
  //   if (v !== undefined && v !== null) fd.append(k, v as any);
  // });
  // const { data } = await axios.post("/api/trips", fd);
  // return data;

  // mock
  return {
    id: Math.floor(Math.random() * 100_000),
    folderId: payload.folderId ?? 0,
    title: payload.title,
    status: payload.status ?? "예정",
    startDate: payload.startDate
      ? new Date(payload.startDate)
      : null,
    endDate: payload.endDate
      ? new Date(payload.endDate)
      : null,
    days: payload.days,
    destinations: payload.destinations ?? [payload.region],
    participants: payload.participants ?? 1,
    thumbnail: undefined,
  };
};

/* ======================
 * 수정
 * ====================== */

export const updateTrip = async (
  tripId: number,
  payload: TripUpdatePayload
): Promise<TripResponseDto> => {
  const fd = new FormData();
  Object.entries(payload).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      fd.append(key, value as any);
    }
  });

  // 실제 연동 시:
  // const { data } = await axios.put(`/api/trips/${tripId}`, fd, {
  //   headers: { "Content-Type": "multipart/form-data" },
  // });
  // return data;

  // mock
  return {
    id: tripId,
    title: payload.title ?? "제목 없음",
    region: payload.region ?? "",
    status: payload.status ?? "예정",
    startDate: payload.startDate ?? null,
    endDate: payload.endDate ?? null,
    days: payload.days,
    destinations: payload.destinations ?? [],
    participants: payload.participants ?? 1,
    thumbnail: payload.coverImage
      ? payload.coverImage.name
      : null,
  };
};
