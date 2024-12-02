import { Plus } from "lucide-react";
import { ResumeCardButton } from "./resume-card";

export const AddResumeButton = () => {
  return (
    <ResumeCardButton
      title="Create new curriculum"
      description="Start from zero"
      icon={<Plus size={50} />}
    />
  );
};
