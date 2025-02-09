import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import { mergician } from "mergician";

type GenerateToFixContentProps = {
  onClose: () => void;
};

export const GenerateToFixContent = ({
  onClose,
}: GenerateToFixContentProps) => {
  const { formState, handleSubmit } = useForm<FormData>();
  const { setValue, getValues } = useFormContext<ResumeData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.fixContent,
  });

  const onSubmit = async () => {
    const content = getValues("content");
    const data = await handleGenerate(content);

    const generation = JSON.parse(data.data);

    const mergedContent = mergician(content, generation) as ResumeContentData;

    setValue("content", mergedContent);

    toast.success("Content succesfully generated!");

    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>
        This functionality upgrades the cv current content and spelling errors.{" "}
        <strong>Remember to fill out the content before generate it.</strong>
      </p>

      <p>This can take a few seconds, wait the result.</p>
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
