import { BaseDialogProps, Dialog } from "@/components/ui/dialog";
import { GenrateFromJobTitle } from "./job-title";

type GenerationDialogProps = BaseDialogProps & {
  mode: AIGenerationMode;
};

export const GenerationDialog = ({ mode, ...props }: GenerationDialogProps) => {
  const configPerMode: Record<AIGenerationMode, JSX.Element> = {
    JOB_TITLE: <GenrateFromJobTitle />,
    FIX_CONTENT: <div>Update and correct existing content</div>,
    TRANSLATE_CONTENT: <div>Translate current content</div>,
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
