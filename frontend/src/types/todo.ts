export type TodoStatus = "Pending" | "InProgress" | "Completed";

export interface TodoItem {
  id: number;
  title: string;
  description: string;
  status: TodoStatus;
}
