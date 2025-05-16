"use client";

import { BuyCreditsDialog } from "@/components/pages/dashboard/resume/infos-sidebar/ai-generation-dropdown/generation-dialog/buy-credits-dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { queryKeys } from "@/constants/queries-keys";
import { ApiService } from "@/services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BadgeCent, SquareUser } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function DashboardAccountPage() {
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  const pathname = usePathname();

  const { mutate: handleOpenTransactions, isPending } = useMutation({
    mutationFn: () => ApiService.getPortalUrl(pathname),
    onSuccess: (url) => {
      location.href = url;
    },
  });

  const { data: credits, isLoading } = useQuery({
    queryKey: [queryKeys.credits],
    queryFn: ApiService.getCredits,
  });

  return (
    <>
      <h1 className="font-title font-bold text-3xl flex items-center gap-2">
        <SquareUser size={25} className="text-muted-foreground" />
        Account config
      </h1>

      <Separator className="my-6" />

      <section>
        <div className="flex items-center gap-1">
          You have
          <strong className="text-foreground inline-flex gap-0.5 items-center">
            <BadgeCent size={14} />
            {isLoading ? <Skeleton className="w-5 h-5 " /> : credits}{" "}
          </strong>
        </div>

        <p className="text-muted-foreground mt-2">
          {" "}
          Credits are used to generate content for your resumes with AI
        </p>

        <div className="flex items-center gap-4 mt-4">
          <Button
            variant={"secondary"}
            disabled={isLoading}
            onClick={() => setShowCreditsModal(true)}
          >
            Add credits
          </Button>
          <Button
            variant={"outline"}
            disabled={isLoading || isPending}
            onClick={() => handleOpenTransactions()}
          >
            My transactions
          </Button>
        </div>
      </section>

      <BuyCreditsDialog open={showCreditsModal} setOpen={setShowCreditsModal} />
    </>
  );
}
