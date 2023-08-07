import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useMovie = (id: string | undefined) => {
  const { data, error, isLoading, mutate } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMovie;
