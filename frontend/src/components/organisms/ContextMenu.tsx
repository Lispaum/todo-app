import { useEffect, useRef, type FC } from "react";

export type ContextMenuCoords = { x: number; y: number };

interface Props {
  coords: ContextMenuCoords;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export const ContextMenu: FC<Props> = ({
  coords: { x, y },
  onClose,
  onEdit,
  onDelete,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("click", handler);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      className="fixed z-50 bg-bg-800 border rounded shadow-md py-2 w-40"
      style={{ top: y, left: x }}
    >
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onEdit();
        }}
        className="w-full text-doing text-left px-4 py-2 hover:bg-bg-700"
      >
        <span className="mr-1">✏️</span> Edit
      </button>

      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onDelete();
        }}
        className="w-full text-left px-4 py-2 hover:bg-bg-700 text-danger"
      >
        <span className="mr-1">🗑</span> Delete
      </button>
    </div>
  );
};
