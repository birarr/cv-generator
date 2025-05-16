import { MutationCache, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { error } from "console";
import { useState } from "react";
import { toast } from "sonner";

const handleErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unexpected error.";
  }

  return error?.response?.data?.message || "Unexpected error.";
};

export const useTanstackQuery = () => {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnWindowFocus: false,
          retry: false,
        },
      },
      mutationCache: new MutationCache({
        onError: (error, _variables, _context, mutation) => {
          if (mutation.options.onError) return;

          const errorMesage = handleErrorMessage(error);

          toast.error(errorMesage);
          console.log(error);
        },
      }),
    })
  );

  return queryClient;
};
