import { z } from "zod";

export const taskSchema = z
  .object({
    icon: z.string().optional(),
    title: z.string().optional(),
    date: z
      .object({
        from: z.date().optional(),
        to: z.date().optional(),
      })
      .nullable()
      .optional(),
    content: z.any(),
  })
  .refine((data) => data.date?.from && data.date?.to, {
    message: "Both start and end dates are required",
    path: ["date"],
  })
  .refine(
    (data) =>
      data.date?.from &&
      data.date?.to &&
      data.date.to.getTime() > data.date.from.getTime(),
    {
      message: "End date must be after start date",
      path: ["date.to"],
    }
  );

export type TaskSchemaType = z.infer<typeof taskSchema>;
