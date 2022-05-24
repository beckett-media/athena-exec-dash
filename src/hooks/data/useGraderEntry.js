import useSWR from "swr";

export default function useGraderEntry(direction) {
  const { data, error } = useSWR(`/graderentry/${direction}`);

  return {
    graderEntry: data
      ? data.data.map((d) => {
          const { rid, ...rest } = d;
          return {
            ...rest?.properties,
          };
        })
      : [],
    isLoading: !error && !data,
    isError: error,
  };
}
