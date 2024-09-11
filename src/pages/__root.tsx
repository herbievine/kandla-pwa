import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";

export const queryClient = new QueryClient();

export const rootRoute = createRootRoute({
  component: RootLayout,
  notFoundComponent: () => <h1>404</h1>,
  pendingComponent: () => <span>Loading...</span>,
});

function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex flex-col text-sm md:text-base">
        {/* <header className="h-12 w-full sticky top-0 bg-white">
          <nav className="flex justify-between items-center p-4 _border-b _border-neutral-300">
            <div>
              <Link to="/" className="text-neutral-800 font-semibold">
                Kandla
              </Link>
            </div>
          </nav>
        </header> */}
        <Outlet />
      </div>
    </QueryClientProvider>
  );
}
