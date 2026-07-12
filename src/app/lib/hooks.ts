// ---------------------------------------------------------------------------
// Generic data-fetching hook — wraps fetch calls with loading/error/data state.
// Replace with React Query, SWR, or your preferred data-fetching library when
// the backend is connected.
// ---------------------------------------------------------------------------

import { useState, useEffect, useCallback } from "react";
import { api, ApiError } from "./api";

export interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  retry: () => void;
}

export function useApi<T>(path: string | null): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!!path);
  const [error, setError] = useState<string | null>(null);
  const [tick, setTick] = useState(0);

  const retry = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (!path) return;
    let cancelled = false;
    setLoading(true);
    setError(null);
    api.get<T>(path)
      .then((res) => { if (!cancelled) { setData(res); setLoading(false); } })
      .catch((err) => {
        if (!cancelled) {
          setError(err instanceof ApiError ? err.message : "Something went wrong.");
          setLoading(false);
        }
      });
    return () => { cancelled = true; };
  }, [path, tick]);

  return { data, loading, error, retry };
}
