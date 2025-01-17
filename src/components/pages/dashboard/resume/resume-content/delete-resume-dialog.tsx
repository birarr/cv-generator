import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { deleteResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const DeleteResumeDialog = (props: BaseDialogProps) => {
  const [open, setOpen] = useState(false);

  const params = useParams();
  const resumeId = params?.id as string;
  const router = useRouter();

  const { mutate: handleDeleteResume, isPending } = useMutation({
    mutationFn: deleteResume,
    onSuccess: () => {
      toast.success("CV successfully deleted!");
      router.push("/dashboard/resumes");
    },
  });

  const onDelete = async () => {
    handleDeleteResume(resumeId);
  };

  return (
    <Dialog
      {...props}
      open={open}
      setOpen={setOpen}
      title="Delete CV"
      description="Are ou sure you want to delete this CV?"
      content={
        <div className="flex gap-2 ml-auto">
          <Button variant="secondary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onDelete} disabled={isPending}>
            Delete
          </Button>
        </div>
      }
    />
  );
};
