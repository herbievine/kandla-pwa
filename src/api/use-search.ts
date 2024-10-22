import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";

async function getSearch(q: string) {
  const searchParams = new URLSearchParams();

  searchParams.set("query", q);

  return fetcher(
    `${import.meta.env.VITE_API_URL}/search?${searchParams}`,
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        linkedEmail: z.string(),
        createdAt: z.coerce.date(),
      }),
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
}

export function searchOptions(q: string) {
  return queryOptions({
    queryKey: ["search", q],
    queryFn: () => getSearch(q),
    staleTime: 10 * 1000,
  });
}

export function useSearch(q: string) {
  const { data, ...query } = useQuery(searchOptions(q));

  return {
    search: data,
    ...query,
  };
}

export function useSuspenseSearch(q: string) {
  const { data, ...query } = useSuspenseQuery(searchOptions(q));

  return {
    search: data,
    ...query,
  };
}
