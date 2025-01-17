import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input/input";
import { duplicateResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
};

export const DeuplicateResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const methods = useForm<FormData>();
  const params = useParams();
  const resumeId = params?.id as string;
  const router = useRouter();

  const { mutate: handleDuplicateResume, isPending } = useMutation({
    mutationFn: (title: string) => duplicateResume(resumeId, title),
    onSuccess: (newResume) => {
      toast.success("CV successfully duplicated!");
      setOpen(false);
      router.push(`/dashboard/resumes/${newResume.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    handleDuplicateResume(data.title);
  };

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Duplicate CV"
      description="Are ou sure you want to duplicate this CV?"
      content={
        <form
          className="flex flex-col"
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Controller
            control={methods.control}
            name="title"
            render={({ field }) => <Input placeholder="New title" {...field} />}
            rules={{ required: "Mandatory field!" }}
          />

          <div className="flex mt-4 ml-auto gap-4">
            <Button
              variant="secondary"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit">Duplicate</Button>
          </div>
        </form>
      }
    />
  );
};
