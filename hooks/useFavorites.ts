// import fetcher from "@/lib/fetcher";
// import useSWR from "swr";

// const useFavorites = () => {
//   const { data, isLoading, error, mutate } = useSWR("/api/favorites", fetcher);

//   return {
//     data,
//     isLoading,
//     error,
//     mutate,
//   };
// };

// export default useFavorites;

import useSwr from "swr";
import fetcher from "@/lib/fetcher";

const useMovies = () => {
  const { data, error, isLoading, mutate } = useSwr("/api/favorites", fetcher);
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useMovies;
