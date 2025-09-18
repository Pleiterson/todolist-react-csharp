import type { z } from "zod";
import type { createTaskSchema, updateTaskSchema } from "../utils/validationTask";

export interface Task {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  category: string;
  createdAt: string;
  updatedAt: string;
  userId: number | null;
};

export type CreateTaskDTO = {
  title: string;
  description?: string;
  category: string;
  isCompleted?: boolean;
  userId: number;
};

export type UpdateTaskDTO = Partial<Omit<Task, "id" | "createdAt" | "updatedAt" | "userId">> & {
  category?: string;
  isCompleted?: boolean;
  title?: string;
  description?: string;
};

export type FormValuesCreate = z.infer<typeof createTaskSchema>;

export interface CreateTaskProps {
  onCreated: (task: Task) => void;
};

export type FormValuesUpdate = z.infer<typeof updateTaskSchema>;

export interface EditTaskProps {
  task: Task;
  onUpdated: (task: Task) => void;
};

export interface DeleteTaskProps {
  task: Task;
  onDeleted: (id: number) => void;
};

export interface CategorizeTaskProps {
  task: Task;
  onUpdated: (task: Task) => void;
};
