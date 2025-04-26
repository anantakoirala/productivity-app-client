import { z } from "zod";

export const addNewTaskSchema = z.object({
  name: z.string().min(2, "Name should be atleast 2 characters").max(30),
  projectId: z.coerce.number().min(1, "Project is required"),
});

export type AddNewTaskSchemaType = z.infer<typeof addNewTaskSchema>;
