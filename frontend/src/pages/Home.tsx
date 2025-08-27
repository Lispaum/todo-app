import { useState } from "react";
import type { FC } from "react";
import { Column } from "../components/molecules/Column";
import { TodoModal } from "../components/organisms/TodoModal";
import type { TodoItem } from "../types/todo";
import { createTodo, updateTodo } from "../services/api";
import { Button } from "../components/atoms/Button";

export const Home: FC<{ todos: TodoItem[]; refetch: () => void }> = ({
  todos,
  refetch,
}) => {
  const pendingTodos: TodoItem[] = [];
  const inProgressTodos: TodoItem[] = [];
  const completedTodos: TodoItem[] = [];

  todos.forEach((t) => {
    if (t.status === "Pending") {
      pendingTodos.push(t);
    } else if (t.status === "InProgress") {
      inProgressTodos.push(t);
    } else if (t.status === "Completed") {
      completedTodos.push(t);
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<TodoItem | null>(null);

  const handleCreate = () => {
    setEditingTodo(null);
    setIsModalOpen(true);
  };

  const handleEdit = (todo: TodoItem) => {
    setEditingTodo(todo);
    setIsModalOpen(true);
  };

  const handleSave = async (todo: Partial<TodoItem>) => {
    if (todo.id) {
      await updateTodo(todo.id, todo);
    } else {
      await createTodo(todo as TodoItem);
    }

    refetch();
  };

  return (
    <div className="min-h-screen bg-bg-900 p-6">
      <h1 className="text-3xl text-text-300 font-bold mb-6 text-center">
        Todo Board
      </h1>

      <div className="flex justify-center mb-6">
        <Button label="+ New Todo" action={handleCreate} variant="doing" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column
          title="Pending"
          todos={pendingTodos}
          refetch={refetch}
          onEdit={handleEdit}
        />
        <Column
          title="InProgress"
          todos={inProgressTodos}
          refetch={refetch}
          onEdit={handleEdit}
        />
        <Column
          title="Completed"
          todos={completedTodos}
          refetch={refetch}
          onEdit={handleEdit}
        />
      </div>

      <TodoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingTodo}
      />
    </div>
  );
};
