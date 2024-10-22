import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { useFeed } from "../api/use-feed";
import { cn } from "../lib/cn";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

function IndexPage() {
  const { feed } = useFeed();

  return (
    <div className="flex flex-col">
      <h1 className="p-4 font-black text-xl">Your feed</h1>
      <ul className="flex flex-col border-y border-neutral-300 divide-y divide-neutral-300">
        {feed?.map((email) => (
          <li key={email.id} className="w-full">
            <Link
              to="/email/$emailId"
              params={{ emailId: email.id }}
              className={cn("w-full h-full px-4 py-4 flex flex-col", email.seen ? "bg-neutral-100" : "bg-white")}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold">{email.newsletterName}</span>
                <span className="text-xs whitespace-nowrap font-semibold text-neutral-500">
                  {dayjs(email.createdAt).fromNow()}
                </span>
              </div>
              <span className="line-clamp-1 text-sm text-neutral-800">{email.subject}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
