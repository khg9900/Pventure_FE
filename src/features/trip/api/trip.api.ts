import type { Trip } from "../types/trip.type";

export const getTrips = async (): Promise<Trip[]> => {
  // const { data } = await axios.get("/api/trips");
  // return data;
  return [];
};

export const createTrip = async (trip: Omit<Trip, "id">) => {
  // const { data } = await axios.post("/api/trips", trip);
  // return data;
  return { ...trip, id: Math.floor(Math.random() * 10000) };
};
