import "./App.css";
import { Home } from "./pages/Home";
import type { TodoItem } from "./types/todo";
import { getTodos } from "./services/api";
import { useEffect, useState, type FC } from "react";

export const App: FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);

  async function load() {
    const data = await getTodos();
    setTodos(data);
  }

  useEffect(() => {
    load();
  }, []);

  return <Home todos={todos} refetch={load} />;
};
