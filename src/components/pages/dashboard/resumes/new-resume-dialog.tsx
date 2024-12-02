"use client";
import { Button } from "@/components/ui/button";
import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { InputField } from "@/components/ui/input/field";
import React from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";

type FormData = {
  title: string;
};

export const NewResumeDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
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

            <Button type="submit" className="w-max mt-6 ml-auto">
              Create
            </Button>
          </form>
        </FormProvider>
      }
    />
  );
};
