"use client";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input/field";
import { createResume } from "@/db/actions";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

type FormData = {
  title: string;
};

export const NewResumeDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>();

  const router = useRouter();

  const { mutate: handleCreateResume, isPending } = useMutation({
    mutationFn: createResume,
    onSuccess: (resume) => {
      toast.success("CV successfully created!");
      router.push(`/dashboard/resumes/${resume.id}`);
    },
  });

  const onSubmit = async (data: FormData) => {
    handleCreateResume(data.title);
  };

  return (
    <Dialog
      {...props}
      title="Create a new curriculum"
      description="Choose a title"
      content={
        <FormProvider {...methods}>
          <form
            className="flex flex-col"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <InputField label="Title" name="title" required />

            <Button
              type="submit"
              className="w-max mt-6 ml-auto"
              disabled={isPending}
            >
              Create
            </Button>
          </form>
        </FormProvider>
      }
    />
  );
};
