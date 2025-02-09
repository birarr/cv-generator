import { Button } from "@/components/ui/button";
import { ApiService } from "@/services/api";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languagesOptions } from "../../../structure-sidebar/sections/sections.types";
import { Item } from "@radix-ui/react-dropdown-menu";
import { mergician } from "mergician";

type FormData = {
  language: ResumeLanguages;
};

type GenrateTranslationProps = {
  onClose: () => void;
};

export const GenrateTranslation = ({ onClose }: GenrateTranslationProps) => {
  const { control, formState, handleSubmit } = useForm<FormData>();
  const { setValue, getValues } = useFormContext<ResumeData>();

  const { mutateAsync: handleGenerate } = useMutation({
    mutationFn: ApiService.translate,
  });

  const onSubmit = async (formData: FormData) => {
    const content = getValues("content");

    const selectedLanguage = languagesOptions.find(
      (item) => item.value === formData.language
    );
    const data = await handleGenerate({
      content,
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      language: selectedLanguage?.label!,
    });

    const generation = JSON.parse(data.data);

    const mergedContent = mergician(content, generation) as ResumeContentData;

    setValue("content", mergedContent);
    setValue("structure.language", formData.language);

    toast.success("Content succesfully generated!");

    onClose();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <p>This functionality translate the content to the language below.</p>
      <p>This can take some time</p>
      <Controller
        control={control}
        name="language"
        rules={{ required: true }}
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languagesOptions.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
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
