"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  addImage: (url: string) => void;
};

const linkSchema = z.object({
  link: z.string().url(),
});

const AddImageByLink = ({ addImage }: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<z.infer<typeof linkSchema>>({
    resolver: zodResolver(linkSchema),
    defaultValues: {
      link: "",
    },
  });

  const isImage = async (url: string) => {
    try {
      const data = await fetch(url, { method: "HEAD" });
      if (!data.ok) return false;
      const res = data.headers.get("Content-Type")?.startsWith("image");
      if (res) return true;
      return false;
    } catch (_) {
      return false;
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (data: z.infer<typeof linkSchema>) => {
    console.log("hello");
    setIsLoading(true);
    try {
      const isValidLink = await isImage(data.link);
      if (!isValidLink) {
        form.setError("link", { message: "Provide a valid image link" });
        setIsLoading(false);
        return;
      }
      addImage(data.link);
    } catch (_) {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <form className="space-y-1" id="add-image-link">
        <div className="flex flex-col gap-1">
          <Input
            placeholder="link"
            {...register("link")}
            className="bg-muted"
          />
          {errors && errors.link && (
            <span className="text-red-600 text-sm">{errors?.link.message}</span>
          )}
        </div>

        <Button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleSubmit(onSubmit)(e);
          }}
          className="w-full dark:text-white font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Image"}
        </Button>
      </form>
    </div>
  );
};

export default AddImageByLink;
