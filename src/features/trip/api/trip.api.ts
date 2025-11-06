import type { Trip } from "../types/trip.type";
import type { TripCreatePayload } from "../types/form";

export const getTrips = async (): Promise<Trip[]> => {
  // const { data } = await axios.get("/api/trips");
  // return data;
  return [];
};

export const createTrip = async (payload: TripCreatePayload): Promise<Trip> => {
  // 실제 연동 예시 (파일 포함 시):
  // const fd = new FormData();
  // Object.entries(payload).forEach(([k, v]) => {
  //   if (v !== undefined && v !== null) fd.append(k, v as any);
  // });
  // const { data } = await axios.post("/api/trips", fd);
  // return data;

  // mock 응답: 폼 payload → Trip 형태로 매핑
  return {
    id: Math.floor(Math.random() * 100000),
    folderId: payload.folderId ?? 0,
    title: payload.title,
    status: payload.status ?? "예정",
    startDate: payload.startDate ? new Date(payload.startDate) : new Date(),
    endDate: payload.endDate ? new Date(payload.endDate) : new Date(),
    destinations: payload.destinations ?? [payload.region],
    participants: payload.participants ?? 1,
    thumbnail: undefined, // coverImage 업로드 후 서버가 생성해 줄 값
  };
};
