import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";
import dayjs from "dayjs";

async function getFeed() {
  const feed = await fetcher(
    `${import.meta.env.VITE_API_URL}/feed`,
    z.array(
      z.object({
        id: z.string(),
        subject: z.string().nullable(),
        seen: z.boolean(),
        newsletterName: z.string(),
        createdAt: z.coerce.date(),
      }),
    ),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return feed.sort((a, b) => (dayjs(a.createdAt).isBefore(dayjs(b.createdAt)) ? 1 : -1));
}

export function feedOptions() {
  return queryOptions({
    queryKey: ["feed"],
    queryFn: () => getFeed(),
    staleTime: 10 * 1000,
  });
}

export function useFeed() {
  const { data, ...query } = useQuery(feedOptions());

  return {
    feed: data,
    ...query,
  };
}

export function useSuspenseFeed() {
  const { data, ...query } = useSuspenseQuery(feedOptions());

  return {
    feed: data,
    ...query,
  };
}
