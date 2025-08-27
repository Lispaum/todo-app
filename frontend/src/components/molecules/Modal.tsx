import type { FC, ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal: FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="overlay fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="modal bg-bg-800 rounded-2xl shadow-lg w-full max-w-md p-6">
        <div className="header flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-text-100">{title}</h2>

          <button
            onClick={onClose}
            className="text-text-300 font-bold cursor-pointer hover:font-extrabold hover:text-text-100  transition-colors"
          >
            ✕
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
};
