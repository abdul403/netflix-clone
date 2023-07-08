import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useBillboard = () => {
  const { data, isLoading, error } = useSWR("/api/random", fetcher, {
    revalidateIfStale: false,
    revalidateOnReconnect: false,
    revalidateOnFocus: false,
  });

  return {
    data,
    isLoading,
    error,
  };
};

export default useBillboard;
