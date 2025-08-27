import { useState, type FC } from "react";
import type { TodoItem } from "../../types/todo";
import { deleteTodo } from "../../services/api";
import { ContextMenu, type ContextMenuCoords } from "./ContextMenu";

type Props = {
  todo: TodoItem;
  refetch: () => void;
  onEdit: (todo: TodoItem) => void;
};

export const TodoCard: FC<Props> = ({ todo, refetch, onEdit }) => {
  const [menu, setMenu] = useState<ContextMenuCoords | null>(null);

  const handleDelete = async () => {
    await deleteTodo(todo.id);
    setMenu(null);
    refetch();
  };

  const openEditModal = () => {
    setMenu(null);
    onEdit(todo);
  };

  return (
    <div
      className="p-4 bg-bg-800 rounded-lg shadow cursor-pointer hover:bg-bg-700 relative border-2 border-bg-700"
      onClick={(e) => {
        e.preventDefault();
        openEditModal();
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setMenu({ x: e.pageX, y: e.pageY });
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-text-100 ${
            todo.status === "Completed" ? "line-through " : ""
          }`}
        >
          {todo.title}
        </span>
      </div>

      {menu && (
        <ContextMenu
          coords={{ x: menu.x, y: menu.y }}
          onClose={() => setMenu(null)}
          onEdit={() => {
            openEditModal();
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};
