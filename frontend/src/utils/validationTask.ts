import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().optional(),
});

export const createTaskResolver = zodResolver(createTaskSchema);

export const defaultValuesCreate = {
  title: '',
  category: '',
  description: '',
};

export const updateTaskSchema = z.object({
  title: z.string().min(3, "Mínimo 3 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  description: z.string().optional(),
  isCompleted: z.boolean(),
});

export const updateTaskResolver = zodResolver(updateTaskSchema);
