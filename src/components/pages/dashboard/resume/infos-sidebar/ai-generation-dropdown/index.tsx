import { Button } from "@/components/ui/button";
import {
  BadgeCent,
  Bot,
  BriefcaseBusiness,
  CirclePercent,
  Languages,
  PencilLine,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { GenerationDialog } from "./generation-dialog";

export const AIGenerationDropdown = () => {
  const [generationMode, setGenerationMode] = useState<AIGenerationMode | null>(
    null
  );

  const actions = [
    {
      label: "Buy credits",
      icon: CirclePercent,
      onClick: () => console.log("Buy credits"),
    },
    {
      label: "Generate content for job opportunities",
      icon: BriefcaseBusiness,
      onClick: () => setGenerationMode("JOB_TITLE"),
    },
    {
      label: "Update and correct existing content",
      icon: PencilLine,
      onClick: () => setGenerationMode("FIX_CONTENT"),
    },
    {
      label: "Translate current content",
      icon: Languages,
      onClick: () => setGenerationMode("TRANSLATE_CONTENT"),
    },
  ];
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="gap-2 text-xs px-2.5 py-1 h-9">
            <Bot size={20} />
            Artificial intelligence
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent sideOffset={10} align="start">
          <DropdownMenuLabel className="text-muted-foreground text-xs flex items-center gap-1">
            You have{" "}
            <strong className="text-foreground inline-flex gap-0.5 items-center">
              <BadgeCent size={14} />
              20 credits
            </strong>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {actions.map((action) => (
            <DropdownMenuItem
              key={action.label}
              className="gap-2"
              onClick={action.onClick}
            >
              <action.icon size={18} className="text-muted-foreground" />
              {action.label}
            </DropdownMenuItem>
          ))}
          {/* <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>

      {!!generationMode && (
        <GenerationDialog
          mode={generationMode}
          open={!!generationMode}
          setOpen={(value) => {
            if (!value) setGenerationMode(null);
          }}
        />
      )}
    </>
  );
};
