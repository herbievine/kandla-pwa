import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";

async function getEmails() {
  return fetcher(
    `${import.meta.env.VITE_API_URL}/users/${import.meta.env.VITE_USER_ID}/emails`,
    z.array(
      z.object({
        id: z.string(),
        subject: z.string().nullable(),
        from: z.string(),
        to: z.string(),
        seen: z.boolean(),
        bucketId: z.string(),
        newsletterId: z.string(),
        newsletterName: z.string(),
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

export function emailsOptions() {
  return queryOptions({
    queryKey: ["emails"],
    queryFn: () => getEmails(),
    staleTime: 10 * 1000,
  });
}

export function useEmails() {
  const { data, ...query } = useQuery(emailsOptions());

  return {
    emails: data,
    ...query,
  };
}

export function useSuspenseEmails() {
  const { data, ...query } = useSuspenseQuery(emailsOptions());

  return {
    emails: data,
    ...query,
  };
}
