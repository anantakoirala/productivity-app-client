"use client";
import React, { useCallback, useState } from "react";

import { Editor } from "@tiptap/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ImageIcon } from "lucide-react";
import OptionBtn from "../OptionBtn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddImageByLink from "./AddImageByLink";
import AddImageByImport from "./AddImageByImport";
type Props = {
  editor: Editor | null;
};

const AddEditorImage = ({ editor }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const addImage = useCallback(
    (url: string) => {
      if (editor) {
        editor.chain().focus().setImage({ src: url }).run();
        setIsOpen(false);
      }
    },
    [editor]
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <OptionBtn icon={<ImageIcon size={16} />} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Image</DialogTitle>
          <DialogDescription></DialogDescription>
          <Tabs defaultValue="byLink" className="w-full ">
            <TabsList className="gap-2 flex items-center justify-start">
              <TabsTrigger value="byLink">Add using Link</TabsTrigger>
              <TabsTrigger value="uploadImage">Import from device</TabsTrigger>
            </TabsList>
            <TabsContent value="byLink">
              <AddImageByLink addImage={addImage} />
            </TabsContent>
            <TabsContent value="uploadImage">
              <AddImageByImport addImage={addImage} />
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditorImage;
