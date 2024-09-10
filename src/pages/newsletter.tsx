import { createRoute, Link, useParams } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./__root";
import {
  newsletterEmailsOptions,
  useSuspenseNewsletterEmails,
} from "../api/use-newsletter-emails";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const newsletterRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/newsletter/$newsletterId",
  loader: async (ctx) => {
    await queryClient.ensureQueryData(
      newsletterEmailsOptions(ctx.params.newsletterId),
    );
  },
  component: NewsletterPage,
});

function NewsletterPage() {
  const { newsletterId } = useParams({
    from: "/newsletter/$newsletterId",
  });
  const { newsletterEmails } = useSuspenseNewsletterEmails(newsletterId);

  return (
    <div className="p-12 flex flex-col space-y-6">
      <h1 className="text-xl">Emails</h1>
      <ul>
        {newsletterEmails?.map((email) => (
          <li key={email.id}>
            <Link to="/email/$emailId" params={{ emailId: email.id }}>
              {email.subject} - {dayjs(email.createdAt).fromNow()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
