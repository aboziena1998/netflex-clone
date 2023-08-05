import fetcher from '@/lib/fetcher';
import useSWR from 'swr';

const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR('/api/current', fetcher);

  console.log(data);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useCurrentUser;
