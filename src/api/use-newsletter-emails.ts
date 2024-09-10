import {
  queryOptions,
  useQuery,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";

async function getNewsletterEmails(newsletterId: string) {
  return fetcher(
    `${import.meta.env.VITE_API_URL}/newsletters/${newsletterId}/emails`,
    z.array(
      z.object({
        id: z.string(),
        subject: z.string().nullable(),
        from: z.string(),
        to: z.string(),
        bucketId: z.string(),
        newsletterId: z.string(),
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

export function newsletterEmailsOptions(newsletterId: string) {
  return queryOptions({
    queryKey: ["newsletter-emails", newsletterId],
    queryFn: () => getNewsletterEmails(newsletterId),
    staleTime: 10 * 1000,
  });
}

export function useNewsletterEmails(newsletterId: string) {
  const { data, ...query } = useQuery(newsletterEmailsOptions(newsletterId));

  return {
    newsletterEmails: data,
    ...query,
  };
}

export function useSuspenseNewsletterEmails(newsletterId: string) {
  const { data, ...query } = useSuspenseQuery(
    newsletterEmailsOptions(newsletterId),
  );

  return {
    newsletterEmails: data,
    ...query,
  };
}
