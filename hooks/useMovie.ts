import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useMovie = (id?: string) => {
  const { data, isLoading, error } = useSWR(
    id ? `/api/movies/${id}` : null,
    fetcher
  );

  return {
    data,
    isLoading,
    error,
  };
};

export default useMovie;
