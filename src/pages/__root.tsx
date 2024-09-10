import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";

export const queryClient = new QueryClient();

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <h1>404</h1>,
  pendingComponent: () => <span>Loading...</span>,
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="text-sm md:text-base">
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
