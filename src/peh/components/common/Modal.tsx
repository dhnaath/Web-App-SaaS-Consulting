import React from "react";
import { X } from "lucide-react";

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  maxWidth?: "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
}

const WIDTH_CLASS: Record<NonNullable<ModalProps["maxWidth"]>, string> = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  maxWidth = "md",
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className={`w-full ${WIDTH_CLASS[maxWidth]} rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-2xl overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-neutral-200 dark:border-neutral-800">
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{title}</h3>
            {subtitle && (
              <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                {subtitle}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};
