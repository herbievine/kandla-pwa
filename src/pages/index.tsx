import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { useNewsletters } from "../api/use-newsletters";

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexPage,
});

function IndexPage() {
  const { newsletters } = useNewsletters();

  return (
    <div className="p-12 flex flex-col space-y-6">
      <h1 className="text-xl">Newsletters</h1>
      <ul>
        {newsletters?.map((newsletter) => (
          <li key={newsletter.id}>
            <Link
              to="/newsletter/$newsletterId"
              params={{ newsletterId: newsletter.id }}
            >
              {newsletter.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
