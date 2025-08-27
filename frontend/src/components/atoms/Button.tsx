import type { FC, ReactNode } from "react";
import clsx from "clsx";

type ButtonProps = {
  children?: ReactNode;
  label?: string;
  action: () => void;
  variant?: "default" | "danger" | "warning" | "pending" | "doing" | "done";
};

export const Button: FC<ButtonProps> = ({
  action,
  children,
  label,
  variant = "default",
}) => {
  const base =
    "flex items-center justify-center text-center align-middle px-4 py-2 cursor-pointer rounded font-bold transition-colors duration-200 shadow hover:shadow-md";

  const variants: Record<string, string> = {
    default:
      "bg-primary-500 text-black hover:bg-primary-400 active:bg-primary-600",
    danger: "bg-danger text-text-100 hover:opacity-90 active:brightness-90",
    warning: "bg-pending text-black hover:opacity-90 active:brightness-90",
    pending: "bg-pending text-black hover:opacity-90 active:brightness-90",
    doing: "bg-doing text-text-100 hover:opacity-90 active:brightness-90",
    done: "bg-done text-text-100 hover:opacity-90 active:brightness-90",
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();

        action();
      }}
      className={clsx(base, variants[variant])}
    >
      {label ?? children}
    </button>
  );
};
