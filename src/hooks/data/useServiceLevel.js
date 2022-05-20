import useSWR from "swr";

export default function useServiceLevel() {
  const { data, error } = useSWR("/servicelevel");

  return {
    levels: data
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
