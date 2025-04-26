import { z } from "zod";

export const taskSchema = z
  .object({
    icon: z.string().optional(),
    title: z.string().optional(),
    projectId: z.coerce.number().min(1, "Project is required"),
    date: z
      .object({
        from: z.date().optional(), // don't make it required here
        to: z.date().optional(),
      })
      .nullable()
      .optional(),
    content: z.any(),
  })
  // Require from date explicitly
  .refine((data) => data.date?.from, {
    message: "Start date is required",
    path: ["date.from"],
  })
  // Only check to > from if from exists
  .refine(
    (data) =>
      !data.date?.from || // if no from, skip
      !data.date?.to || // if no to, skip
      data.date.to.getTime() > data.date.from.getTime(), // otherwise validate
    {
      message: "End date must be after start date",
      path: ["date.to"],
    }
  );

export type TaskSchemaType = z.infer<typeof taskSchema>;
