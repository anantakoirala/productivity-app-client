"use client";
import React from "react";
import { z } from "zod";

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const ImageSchema = z.object({
  image: z
    .any()
    .refine((file) => file instanceof File, {
      message: "Please select an image file",
    })
    .refine((file) => file?.size <= MAX_FILE_SIZE, {
      message: "Image must be less than 500KB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), {
      message: "Only .jpg, .jpeg, .png files are accepted",
    }),
});

type Props = {
  addImage: (url: string) => void;
};

const AddImageByImport = ({ addImage }: Props) => {
  return <div>AddImageByImport</div>;
};

export default AddImageByImport;
