import { createRoute, useParams } from "@tanstack/react-router";
import { rootRoute } from "./__root";

export const emailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/email/$emailId",
  component: EmailPage,
});

function EmailPage() {
  const { emailId } = useParams({
    from: "/email/$emailId",
  });

  return (
    <div className="h-screen">
      <iframe
        src={`${import.meta.env.VITE_API_URL}/emails/${emailId}`}
        width="100%"
        height="100%"
      />
    </div>
  );
}
