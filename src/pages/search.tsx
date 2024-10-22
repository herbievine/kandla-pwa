import { createRoute, Link } from "@tanstack/react-router";
import { rootRoute } from "./__root";
import { z } from "zod";
import { useSearch } from "../api/use-search";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDebounce } from "@uidotdev/usehooks";
import { Header } from "../components/header";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";

dayjs.extend(relativeTime);

const formValuesSchema = z.object({
  query: z.string().optional(),
});

type FormValues = z.infer<typeof formValuesSchema>;

export const searchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/search",
  component: SearchPage,
});

function SearchPage() {
  const { handleSubmit, register, watch } = useForm<FormValues>({
    resolver: zodResolver(formValuesSchema),
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  const debouncedQuery = useDebounce(watch("query"), 300);
  const { search: newsletters } = useSearch(debouncedQuery ?? "");
  const { mutate } = useMutation({
    mutationKey: ["subscribe"],
    mutationFn: async (id: string) => {
      return fetcher(
        `${import.meta.env.VITE_API_URL}/newsletters/${id}/join`,
        z.object({
          id: z.string(),
          userId: z.string(),
          newsletterId: z.string(),
          createdAt: z.coerce.string(),
        }),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    },
    // onMutate: async (new) => {
    //   await queryClient.cancelQueries({ queryKey: ["key"] });

    //   const prev = queryClient.getQueryData(["key"]);

    //   queryClient.setQueryData(["key"], () => new);

    //   return { prev };
    // },
    // onError: (_, __, context) => {
    //   queryClient.setQueryData(["key"], context?.prev);

    //   alert("An error occurred updating your business details. Please try again.");
    // },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["key"] });
    // },
  });

  function onSubmit(data: FormValues) {
    console.log("submit", data);
  }

  return (
    <>
      <Header label="Search" showBackButton />
      <div className="flex flex-col space-y-6 p-4">
        <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label htmlFor="amount" className="text-sm text-neutral-600 hidden">
              Search
            </label>
            <input
              id="amount"
              type="text"
              placeholder="Search..."
              className="w-full px-3 py-1.5 text-sm border border-neutral-300 hover:border-neutral-400 focus:border-neutral-400 outline-none rounded-md transition-colors duration-300 ease-in-out"
              {...register("query")}
            />
          </div>
        </form>
        <ul className="flex flex-col border-y border-neutral-300 divide-y divide-neutral-300">
          {newsletters?.map((newsletter) => (
            <li key={newsletter.id} className="w-full">
              <button
                className="w-full h-full px-4 py-4 flex flex-col"
                onClick={() => {
                  mutate(newsletter.id);
                }}
              >
                <div className="w-full flex items-center justify-between">
                  <span className="font-semibold">{newsletter.name}</span>
                  <span className="text-xs whitespace-nowrap font-semibold text-neutral-500">
                    {dayjs(newsletter.createdAt).fromNow()}
                  </span>
                </div>
                <span className="line-clamp-1 text-sm text-neutral-800">{newsletter.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
