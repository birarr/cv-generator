import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { GenrateFromJobTitle } from "./job-title";
import { GenerateToFixContent } from "./fix-content";
import { GenrateTranslation } from "./translate";

type GenerationDialogProps = BaseDialogProps & {
  mode: AIGenerationMode;
  setOpen: (open: boolean) => void;
};

export const GenerationDialog = ({ mode, ...props }: GenerationDialogProps) => {
  const onClose = () => {
    props.setOpen(false);
  };
  const configPerMode: Record<AIGenerationMode, JSX.Element> = {
    JOB_TITLE: <GenrateFromJobTitle onClose={onClose} />,
    FIX_CONTENT: <GenerateToFixContent onClose={onClose} />,
    TRANSLATE_CONTENT: <GenrateTranslation onClose={onClose} />,
  };

  const content = configPerMode[mode];

  return (
    <Dialog
      {...props}
      title="Artificial intelligence"
      description="The generated content will overwrite the current fields. Each generation costs 1 credit."
      content={content}
    />
  );
};
