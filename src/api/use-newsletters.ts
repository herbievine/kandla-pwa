import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";

async function getNewsletters() {
  return fetcher(
    `${import.meta.env.VITE_API_URL}/users/${import.meta.env.VITE_USER_ID}/newsletters`,
    z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        linkedEmail: z.string(),
        userId: z.string(),
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

export function newslettersOptions() {
  return queryOptions({
    queryKey: ["newsletters"],
    queryFn: () => getNewsletters(),
    staleTime: 10 * 1000,
  });
}

export function useNewsletters() {
  const { data, ...query } = useQuery(newslettersOptions());

  return {
    newsletters: data,
    ...query,
  };
}

export function useSuspenseNewsletters() {
  const { data, ...query } = useSuspenseQuery(newslettersOptions());

  return {
    newsletters: data,
    ...query,
  };
}
