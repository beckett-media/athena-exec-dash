import useSWR, { useSWRConfig } from "swr";
import { API } from "aws-amplify";

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

export function useUpdateGraderEntry() {
  const { mutate } = useSWRConfig();

  return (direction, body) => {
    mutate(`/graderentry/${direction}`, async (entries) => {
      try {
        const response = await API.put("palentirApi", "/graderentry", body);

        console.log("useUpdateGraderEntry success", response);
        return (entries || []).filter((e) =>
          e.id === body.id ? response.data : e
        );
      } catch {
        return entries;
      }
    });
  };
}

export function useAddGraderEntry() {
  const { mutate } = useSWRConfig();

  return (direction, body) => {
    mutate(`/graderentry/${direction}`, async (entries) => {
      try {
        const response = await API.post("palentirApi", "/graderentry", body);

        console.log("useAddGraderEntry success", response);
        return [...(entries || []), response.data];
      } catch {
        return entries;
      }
    });
  };
}
