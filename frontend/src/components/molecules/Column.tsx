import type { FC } from "react";
import type { TodoItem, TodoStatus } from "../../types/todo";
import { TodoCard } from "../organisms/TodoCard";

type Props = {
  title: TodoStatus;
  todos: TodoItem[];
  refetch: () => void;
  onEdit: (todo: TodoItem) => void;
};

export const Column: FC<Props> = ({ title, todos, refetch, onEdit }) => {
  let displayTitle: string = title;

  if (title.includes("Progress")) {
    displayTitle = "In Progress";
  }

  const titleStyle =
    title === "Pending"
      ? "text-pending"
      : title === "InProgress"
      ? "text-doing"
      : "text-done";

  return (
    <div className=" bg-bg-800 p-4 rounded-2xl shadow-inner min-h-[40vh]">
      <h2 className={`text-lg font-bold mb-3 text-center ${titleStyle}`}>
        {displayTitle}
      </h2>

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoCard
            key={todo.id}
            todo={todo}
            refetch={refetch}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
};
