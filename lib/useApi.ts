import { useState, useEffect } from 'react';

export const useApi = <T>(query: string) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(query);
        const json = await response.json();

        setData(json);

        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [query]);

  return { data, loading, error };
};
