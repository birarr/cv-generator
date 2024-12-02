"use client";

import { Editor } from "@tiptap/react";

import {
  Italic,
  Bold,
  ListOrdered,
  List,
  Strikethrough,
  Underline,
  AlignLeft,
  AlignJustify,
  AlignCenter,
  AlignRight,
} from "lucide-react";
import { Button } from "../button";
import { Tooltip } from "../tooltip";

type MenuBarProps = {
  editor: Editor | null;
};

export const MenuBar = ({ editor }: MenuBarProps) => {
  if (!editor) return null;

  const ACTIONS = [
    {
      label: "Bold",
      icon: Bold,
      action: () => editor.chain().focus().toggleBold().run(),
      active: editor.isActive("bold"),
    },
    {
      label: "Italic",
      icon: Italic,
      action: () => editor.chain().focus().toggleItalic().run(),
      active: editor.isActive("italic"),
    },
    {
      label: "Strikethrough",
      icon: Strikethrough,
      action: () => editor.chain().focus().toggleStrike().run(),
      active: editor.isActive("strike"),
    },
    {
      label: "Underline",
      icon: Underline,
      action: () => editor.chain().focus().toggleUnderline().run(),
      active: editor.isActive("underline"),
    },
    {
      label: "List",
      icon: List,
      action: () => editor.chain().focus().toggleBulletList().run(),
      active: editor.isActive("bulletList"),
    },
    {
      label: "Ordered list",
      icon: ListOrdered,
      action: () => editor.chain().focus().toggleOrderedList().run(),
      active: editor.isActive("orderedList"),
    },
    {
      label: "Justify left",
      icon: AlignLeft,
      action: () => editor.chain().focus().setTextAlign("left").run(),
      active: editor.isActive({ textAlign: "left" }),
    },
    {
      label: "Justify center",
      icon: AlignCenter,
      action: () => editor.chain().focus().setTextAlign("center").run(),
      active: editor.isActive({ textAlign: "center" }),
    },
    {
      label: "Justify right",
      icon: AlignRight,
      action: () => editor.chain().focus().setTextAlign("right").run(),
      active: editor.isActive({ textAlign: "right" }),
    },
    {
      label: "Justified alignment",
      icon: AlignJustify,
      action: () => editor.chain().focus().setTextAlign("justify").run(),
      active: editor.isActive({ textAlign: "justify" }),
    },
  ];

  return (
    <div className="flex items-center border-b p-2 flex-wrap">
      {ACTIONS.map((action) => (
        <Tooltip key={action.label} content={action.label}>
          <Button
            onClick={action.action}
            variant="ghost"
            className="p-2 h-max"
            type="button"
          >
            <action.icon className="w-4 h-4" />
          </Button>
        </Tooltip>
      ))}
    </div>
  );
};
