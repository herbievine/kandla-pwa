import { createRoute, useParams } from "@tanstack/react-router";
import { queryClient, rootRoute } from "./__root";
import { useMutation } from "@tanstack/react-query";
import { fetcher } from "../lib/fetcher";
import { z } from "zod";

export const emailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/email/$emailId",
  component: EmailPage,
});

function EmailPage() {
  const { emailId } = useParams({
    from: "/email/$emailId",
  });
  const { mutate: setEmailSeen } = useMutation({
    mutationKey: ["set-email-seen"],
    mutationFn: async () => {
      return fetcher(
        `${import.meta.env.VITE_API_URL}/emails/${emailId}/seen`,
        z.any(),
        {
          method: "POST",
        },
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["emails"] });

      const prev = queryClient.getQueryData(["emails"]);

      if (prev && Array.isArray(prev)) {
        const newEmails = prev.map((email) => {
          if (email.id === emailId) {
            return {
              ...email,
              seen: true,
            };
          }

          return email;
        });

        queryClient.setQueryData(["emails"], newEmails);
      }

      return { prev };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["emails"], context?.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["emails"] });
    },
  });

  return (
    <div className="h-screen">
      <iframe
        src={`${import.meta.env.VITE_API_URL}/emails/${emailId}`}
        width="100%"
        height="100%"
        sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox"
        onLoad={() => setEmailSeen()}
      />
    </div>
  );
}
