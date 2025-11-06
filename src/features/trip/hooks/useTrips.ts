import { useEffect, useState } from "react";
import { MOCK_TRIPS } from "../mock/trips.mock";
import { getTrips } from "../api/trip.api";
import type { Trip } from "../types/trip.type";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export function useTrips() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        if (USE_MOCK) {
          if (!mounted) return;
          setTrips(MOCK_TRIPS);
        } else {
          const data = await getTrips();
          if (!mounted) return;
          setTrips(data);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  return { trips, loading };
}
