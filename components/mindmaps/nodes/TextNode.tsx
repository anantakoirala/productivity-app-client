"use client";
import React, { useEffect, useState } from "react";
import { NodeProps, useReactFlow } from "reactflow";
import NodeWrapper from "./NodeWrapper";
import TextareaAutosize from "react-textarea-autosize";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { textNodeSchema, TextNodeSchema } from "@/schema/TextNodeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { NodeColors } from "@/types/NodeColors";

type Props = {
  text: string;
  color: NodeColors;
};

const TextNode = ({ data, id }: NodeProps<Props>) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const { setNodes } = useReactFlow(); // ⬅️ update node data globally

  const form = useForm<TextNodeSchema>({
    resolver: zodResolver(textNodeSchema),
    defaultValues: {
      text: "",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = (data: TextNodeSchema) => {
    setIsEditing(false);
    setNodes((prev) =>
      prev.map((node) =>
        node.id === id
          ? {
              ...node,
              data: {
                ...node.data,
                text: data.text,
              },
            }
          : node
      )
    );
  };

  useEffect(() => {
    if (data.text) {
      form.setValue("text", data?.text);
    }
  }, [data]);
  return (
    <NodeWrapper
      id={id}
      setIsEditing={setIsEditing}
      isEditing={isEditing}
      color={data?.color}
    >
      <div className="w-full py-1.5">
        {isEditing ? (
          <>
            <form id="node-text-form" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-1.5">
                <TextareaAutosize
                  {...register("text")}
                  placeholder={"Edit"}
                  className="min-w-[10rem] max-w-md min-h-[4rem] resize-none appearance-none overflow-hidden bg-transparent placeholder:text-muted-foreground font-semibold focus:outline-none"
                />
              </div>

              <div className="w-full flex justify-end mt-4 gap-2">
                <Button
                  type="button"
                  variant={"ghost"}
                  className=" py-1.5 sm:py:1.5 h-fit border"
                  size={"sm"}
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className=" py-1.5 sm:py-1.5 h-fit border"
                  size={"sm"}
                  variant={"ghost"}
                >
                  Save
                </Button>
              </div>
            </form>
          </>
        ) : (
          <>
            <p className="w-full break-words">{data.text}</p>
          </>
        )}
      </div>
    </NodeWrapper>
  );
};

export default TextNode;
