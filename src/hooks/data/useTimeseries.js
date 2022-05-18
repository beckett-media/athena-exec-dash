import useSWR from "swr";

export default function useTimeseries() {
  const { data, error } = useSWR('/timeserie');

  return {
    timeseries: data.data.map((d) => {
      const { rid, ...rest } = d;
      return {
        ...rest?.properties,
      };
    }),
    isLoading: !error && !data,
    isError: error
  }
}
