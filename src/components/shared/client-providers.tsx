"use client";

import { ReactNode, Suspense, useEffect } from "react";
import { Toaster } from "../ui/sonner";
import { ThemeProvider } from "./theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { useTanstackQuery } from "@/lib/tanstack-query";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const CreditsToast = () => {
  const searchParams = useSearchParams();

  const successCheckout = searchParams.get("success");

  useEffect(() => {
    if (successCheckout === "true") {
      toast.success(
        "Payments successful! Your credits have been added to your account.",
        {
          description:
            "You can now use your credits to purchase products or services.",
        }
      );
    }
  }, [successCheckout]);

  return null;
};

type ClientProvidersProps = {
  children: ReactNode;
};

export const ClientProviders = ({ children }: ClientProvidersProps) => {
  const queryClient = useTanstackQuery();
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Suspense>
          <CreditsToast />
        </Suspense>
        {children}
        <Toaster />
      </ThemeProvider>
    </QueryClientProvider>
  );
};
