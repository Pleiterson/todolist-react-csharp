import api from "../_config/api";
import type { CreateTaskDTO, Task, UpdateTaskDTO } from "../types/tasks";

export const taskService = {
  async getTasks(params?: { userId?: number; category?: string; isCompleted?: boolean }): Promise<Task[]> {
    const res = await api.get<Task[]>("/tasks", { params });
    return res.data;
  },

  async getTaskById(id: number): Promise<Task> {
    const res = await api.get<Task>(`/tasks/${ id }`);
    return res.data;
  },

  async createTask(payload: CreateTaskDTO): Promise<Task> {
    const res = await api.post<Task>("/tasks", payload);
    return res.data;
  },

  async updateTask(id: number, payload: UpdateTaskDTO): Promise<Task> {
    const res = await api.put<Task>(`/tasks/${ id }`, payload);
    return res.data;
  },

  async deleteTask(id: number): Promise<void> {
    await api.delete(`/tasks/${ id }`);
  },
};
