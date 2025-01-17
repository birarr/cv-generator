import { Button } from "@/components/ui/button";
import { EditorField } from "@/components/ui/editor/field";
import { InputField } from "@/components/ui/input/field";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

type FormData = {
  jobTitle: string;
  jobDescription: string;
};

export const GenrateFromJobTitle = () => {
  const { control, formState, handleSubmit } = useForm<FormData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.generateContentForJob,
  });

  const onSubmit = async (formData: FormData) => {
    const data = await handleGenerate(formData);

    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <InputField
        control={control}
        name="jobTitle"
        label="Job title"
        placeholder="Frontend developer"
        required
      />
      <EditorField
        control={control}
        name="jobDescription"
        label="Job description(optional)"
        className="min-h-[200px] max-h-[300px"
      />
      <Button
        className="w-max ml-auto"
        type="submit"
        disabled={formState.isSubmitting}
      >
        Generate content
      </Button>
    </form>
  );
};
