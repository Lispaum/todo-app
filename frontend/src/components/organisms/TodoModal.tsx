import { useState, useEffect, type FC } from "react";
import { Modal } from "../molecules/Modal";
import type { TodoItem, TodoStatus } from "../../types/todo";
import { Button } from "../atoms/Button";

interface TodoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (todo: Partial<TodoItem>) => void;
  initialData?: TodoItem | null;
}

export const TodoModal: FC<TodoModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<TodoStatus>("Pending");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      setTitle("");
      setDescription("");
      setStatus("Pending");
    }
  }, [initialData, isOpen]);

  const handleSubmit = () => {
    onSave({
      id: initialData?.id,
      title,
      description,
      status,
    });

    onClose();
  };

  const isEdit = !!initialData?.id;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Edit Todo" : "Create Todo"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full px-3 py-2 rounded bg-bg-800 border border-bg-700 text-text-100 placeholder-text-500 focus:ring-2 focus:ring-primary-500 outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Description"
          className="w-full px-3 py-2 rounded bg-bg-800 border border-bg-700 text-text-100 placeholder-text-500 focus:ring-2 focus:ring-primary-500 outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full px-3 py-2 rounded bg-bg-800 border border-bg-700 text-text-100 focus:ring-2 focus:ring-primary-500 outline-none"
          value={status}
          onChange={(e) => setStatus(e.target.value as TodoStatus)}
        >
          <option value="Pending">Pending</option>
          <option value="InProgress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>

        <div className="flex justify-end gap-3">
          <Button label="Cancel" action={onClose} variant="warning" />

          <Button
            label={isEdit ? "Save Changes" : "Create"}
            action={handleSubmit}
            variant="default"
          />
        </div>
      </form>
    </Modal>
  );
};
