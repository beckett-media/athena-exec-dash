import useSWR from "swr";

export default function useGraders() {
  const { data, error } = useSWR("/graders");

  return {
    graders: data
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
