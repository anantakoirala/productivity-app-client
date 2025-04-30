import { z } from "zod";

export const taskSchema = z
  .object({
    icon: z.string().optional(),
    title: z.string().optional(),
    projectId: z.coerce.number().min(1, "Project is required"),
    date: z.date().optional(),
    content: z.any(),
  })
  // Ensure date is not before today
  .refine(
    (data) => {
      if (data.date) {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Set today's time to midnight
        return data.date >= today;
      }
      return true; // If no date is provided, validation passes
    },
    {
      message: "Start date cannot be before today",
      path: ["date"],
    }
  )
  // Require date explicitly
  .refine((data) => data.date, {
    message: "Start date is required",
    path: ["date"],
  });

export type TaskSchemaType = z.infer<typeof taskSchema>;
