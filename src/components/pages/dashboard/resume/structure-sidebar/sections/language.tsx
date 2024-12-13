import { Languages } from "lucide-react";
import { SectionTitle } from "../../infos-sidebar/section-title";
import { Controller, useFormContext } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languagesOptions } from "./sections.types";

export const LanguageSection = () => {
  const { control } = useFormContext<ResumeData>();
  return (
    <div>
      <SectionTitle title="Language" icon={Languages} />

      <Controller
        control={control}
        name="structure.language"
        render={({ field }) => (
          <Select value={field.value} onValueChange={field.onChange}>
            <SelectTrigger className="mt-4">
              <SelectValue placeholder="Select a langauge" />
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
    </div>
  );
};
