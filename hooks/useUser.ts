import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/user', fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
