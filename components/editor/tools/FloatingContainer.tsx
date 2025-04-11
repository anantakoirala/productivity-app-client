import React from "react";
import { Editor, FloatingMenu } from "@tiptap/react";
import OptionBtn from "./OptionBtn";
import {
  Heading,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  List,
  ListOrdered,
  Strikethrough,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import AddEditorImage from "./addImage/AddEditorImage";

type Props = {
  editor: Editor;
};

const FloatingContainer = ({ editor }: Props) => {
  return (
    <FloatingMenu
      editor={editor}
      className="flex items-center rounded-md shadow-sm border bg-popover p-1 text-popover-foreground gap1"
    >
      <OptionBtn
        icon={<Heading1 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={
          editor.isActive("heading", { level: 1 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<Heading2 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={
          editor.isActive("heading", { level: 2 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<Heading3 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={
          editor.isActive("heading", { level: 3 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<Heading4 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        className={
          editor.isActive("heading", { level: 4 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<Heading5 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        className={
          editor.isActive("heading", { level: 5 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<Heading6 size={16} />}
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        className={
          editor.isActive("heading", { level: 6 })
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <Separator className="h-6" orientation="vertical" />
      <OptionBtn
        icon={<List size={16} />}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList")
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      <OptionBtn
        icon={<ListOrdered size={16} />}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList")
            ? "bg-accent text-secondary-foreground"
            : ""
        }
      />
      {/* <Separator className="h-6" orientation="vertical" /> */}
      {/* <AddEditorImage editor={editor} /> */}
    </FloatingMenu>
  );
};

export default FloatingContainer;
