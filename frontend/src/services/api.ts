import axios from "axios";
import type { TodoItem, TodoStatus } from "../types/todo";

export const api = axios.create({
  baseURL: "http://localhost:5081/api", //process.env.API_URL,
});

// CRUD
const TODO_ITEMS_ENDPOINT = "/todoitems";

export const getTodo = async (id: number): Promise<TodoItem> => {
  const { data } = await api.get(`${TODO_ITEMS_ENDPOINT}/${id}`);

  return data;
};

export const getTodos = async (): Promise<TodoItem[]> => {
  const { data } = await api.get(TODO_ITEMS_ENDPOINT);
  return data;
};

export const createTodo = async (
  todo: Omit<TodoItem, "id">
): Promise<TodoItem> => {
  const { data } = await api.post(TODO_ITEMS_ENDPOINT, todo);
  return data;
};

export const updateTodo = async (
  todoId: number,
  todo: Partial<Omit<TodoItem, "id">>
): Promise<void> => {
  await api.put(`${TODO_ITEMS_ENDPOINT}/${todoId}`, todo);
};

export const deleteTodo = async (id: number): Promise<void> => {
  await api.delete(`${TODO_ITEMS_ENDPOINT}/${id}`);
};

// atalho para mover status
export const moveTodoToStatus = (id: number, status: TodoStatus) =>
  updateTodo(id, { status });
