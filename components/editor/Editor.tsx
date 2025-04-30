"use client";
import React from "react";

import { useEditor, BubbleMenu, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Color from "@tiptap/extension-color";
import TextStyle from "@tiptap/extension-text-style";

import Link from "@tiptap/extension-link";
import OptionBtn from "./tools/OptionBtn";
import Image from "@tiptap/extension-image";
import CharacterCount from "@tiptap/extension-character-count";

import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold,
  Code,
  Eraser,
  Italic,
  List,
  ListOrdered,
  Redo2,
  Strikethrough,
  UnderlineIcon,
  Undo,
} from "lucide-react";
import { Separator } from "../ui/separator";
import AddLink from "./tools/AddLink";
import FloatingContainer from "./tools/FloatingContainer";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {
  setEditorContent: (content: any) => void;
};

const Editor = ({ setEditorContent }: Props) => {
  const { task } = useSelector((state: RootState) => state.task);
  const { userRoleForWorkspace } = useSelector(
    (state: RootState) => state.workspace
  );
  const editor = useEditor({
    editorProps: {
      handleDrop: () => {
        return false;
      },
      attributes: {
        class:
          "focus:outline-none prose prose-headings:text-secondary-foreground prose-p:text-secondary-foreground prose-strong:text-secondary-foreground prose-a:text-primary prose-a:no-underline prose-a:cursor-pointer   w-full focus-visible:outline-none rounded-md max-w-none  prose-code:text-secondary-foreground prose-code:bg-muted  prose-ol:text-secondary-foreground prose-ul:text-secondary-foreground prose-li:marker:text-secondary-foreground prose-li:marker:font-bold prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl  prose-h5:text-xl prose-h6:text-lg prose-p:text-base prose-headings:line-clamp-1 prose-headings:mt-0 prose-p:my-2",
      },
    },
    extensions: [
      StarterKit.configure({
        dropcursor: {
          class: "text-primary",
        },
      }),
      Underline,
      Link,
      Color,
      TextStyle,

      Image,
      CharacterCount.configure({ limit: 600 }),
      Placeholder.configure({
        emptyNodeClass: "before:text-muted-foreground",
        placeholder: "placeholder",
      }),
    ],
    content: task.content ? task.content : ``,
    editable: userRoleForWorkspace === "READ_ONLY" ? false : true,
    immediatelyRender: false,
    onCreate: ({ editor }) => {
      editor.commands.focus();
    },
    onUpdate: ({ editor }) => {
      setEditorContent(editor.getJSON());
      //console.log(editor.getJSON()); // logs HTML content on change
    },
  });
  return (
    <>
      {editor && (
        <>
          <FloatingContainer editor={editor} />
          <BubbleMenu
            editor={editor}
            tippyOptions={{ zIndex: 20, maxWidth: 10000 }}
            className="rounded-md shadow-sm border bg-popover p-1 text-popover items-center gap-2 flex flex-wrap"
          >
            <OptionBtn
              icon={<Bold size={16} />}
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={
                editor.isActive("bold")
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
            />
            <OptionBtn
              icon={<Italic size={16} />}
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={
                editor.isActive("italic")
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
            />
            <OptionBtn
              icon={<Strikethrough size={16} />}
              onClick={() => editor.chain().focus().toggleStrike().run()}
              className={
                editor.isActive("strike")
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
            />
            <OptionBtn
              icon={<UnderlineIcon size={16} />}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={
                editor.isActive("underline")
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
            />

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
            <OptionBtn
              icon={<Code size={16} />}
              onClick={() => editor.chain().focus().toggleCode().run()}
              className={
                editor.isActive("code")
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
            />
            <Separator className="h-6 " orientation="vertical" />
            <OptionBtn
              icon={
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#8b5cf6" }}
                ></span>
              }
              onClick={() => editor.chain().focus().setColor("#8b5cf6").run()}
              className={
                editor.isActive("textStyle", { color: "#8b5cf6" })
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
              dat-testid="setPurple"
            />

            <OptionBtn
              icon={
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#f59e0b" }}
                ></span>
              }
              onClick={() => editor.chain().focus().setColor("#f59e0b").run()}
              className={
                editor.isActive("textStyle", { color: "#f59e0b" })
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
              dat-testid="setOrange"
            />

            <OptionBtn
              icon={
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#10b981" }}
                ></span>
              }
              onClick={() => editor.chain().focus().setColor("#10b981").run()}
              className={
                editor.isActive("textStyle", { color: "#10b981" })
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
              dat-testid="setGreen"
            />
            <OptionBtn
              icon={
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#3b82f6" }} // Blue-500
                ></span>
              }
              onClick={() => editor.chain().focus().setColor("#3b82f6").run()}
              className={
                editor.isActive("textStyle", { color: "#3b82f6" })
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
              dat-testid="setBlue"
            />

            <OptionBtn
              icon={
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: "#ef4444" }} // Red-500
                ></span>
              }
              onClick={() => editor.chain().focus().setColor("#ef4444").run()}
              className={
                editor.isActive("textStyle", { color: "#ef4444" })
                  ? "bg-accent text-secondary-foreground"
                  : ""
              }
              dat-testid="setRed"
            />
            <OptionBtn
              icon={
                <span className="w-4 h-4 rounded-full bg-secondary-foreground"></span>
              }
              onClick={() => editor.chain().focus().unsetColor().run()}
              dat-testid="unsetColor"
            />

            <Separator className="h-6 " orientation="vertical" />
            <OptionBtn
              icon={<Undo size={16} />}
              onClick={() => editor.commands.undo()}
            />
            <OptionBtn
              icon={<Redo2 size={16} />}
              onClick={() => editor.commands.redo()}
            />
            <OptionBtn
              icon={<Eraser size={16} />}
              onClick={() => editor.commands.deleteSelection()}
            />
            <Separator className="h-6 " orientation="vertical" />
            <AddLink editor={editor} />
          </BubbleMenu>
        </>
      )}
      <EditorContent spellCheck={false} editor={editor} />
      {editor && (
        <div className="mt-10 flex justify-between items-center text-muted-foreground text-sm py-4">
          <div>
            <p>
              characters: {editor.storage.characterCount.characters()}/{"600"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Editor;
