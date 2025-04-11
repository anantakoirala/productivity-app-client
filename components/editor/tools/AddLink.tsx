"use client";
import React, { useCallback, useState } from "react";
import { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { LinkSchema, LinkSchemaType } from "@/schema/LinkSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

type Props = {
  editor: Editor | null;
};

const AddLink = ({ editor }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const form = useForm<LinkSchemaType>({
    resolver: zodResolver(LinkSchema),
    defaultValues: {
      link: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = form;

  const removeLink = useCallback(() => {
    if (editor) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setIsOpen(false);
    }
  }, [editor]);

  const setLink = useCallback(() => {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    form.setValue("link", previousUrl ? previousUrl : "");
  }, [editor, form]);

  const saveLink = useCallback(
    (data: LinkSchemaType) => {
      const { link } = data;
      if (editor) {
        console.log("hello");
        editor
          .chain()
          .focus()
          .extendMarkRange("link")
          .setLink({ href: link })
          .run();
        setIsOpen(false);
      }
    },
    [editor]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={setLink}
          type="button"
          size={"icon"}
          variant={"ghost"}
          className="w-7 h-7 flex justify-center items-center rounded-sm text-muted-foreground"
        >
          <Link2 size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Insert Link</DialogTitle>
        </DialogHeader>
        <form className="space-y-8 my-4" onSubmit={handleSubmit(saveLink)}>
          <div className="flex flex-col gap-1">
            <Label className="text-muted-foreground">Link</Label>
            <Input
              placeholder="link"
              {...register("link")}
              className="bg-muted"
            />
            {errors && errors.link && (
              <span className="text-red-600 text-sm">
                {errors?.link.message}
              </span>
            )}
          </div>
          <div className="flex justify-end w-full items-center gap-2">
            <Button
              variant={"secondary"}
              type="button"
              onClick={removeLink}
              disabled={!!!editor?.getAttributes("link").href}
            >
              Remove Link
            </Button>
            <Button disabled={!isValid} type="submit" className="text-white">
              Add Link
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddLink;
