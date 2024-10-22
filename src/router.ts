import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./pages/__root";
import { indexRoute } from "./pages/index";
import { searchRoute } from "./pages/search";
import { emailRoute } from "./pages/email";
import { newsletterRoute } from "./pages/newsletter";

const routeTree = rootRoute.addChildren([
  indexRoute,
  searchRoute,
  emailRoute,
  newsletterRoute,
]);

export const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
