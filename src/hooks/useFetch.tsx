import { useEffect, useState, useCallback } from 'react';

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

interface UseFetchReturn<T> extends FetchState<T> {
  refresh: () => void; // ✅ explicitly declare refresh
}

function useFetch<T = any>(url: string): UseFetchReturn<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const [refreshIndex, setRefreshIndex] = useState(0);

  const refresh = useCallback(() => {
    setRefreshIndex(prev => prev + 1);
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true }));

        const response = await fetch(url, {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error: any) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [url, refreshIndex]);

  return { ...state, refresh };
}

export default useFetch;
