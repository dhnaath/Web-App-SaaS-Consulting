import React from "react";
import { Icon } from "./Icon";

export interface EmptyStateProps {
  iconName: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryLabel?: string;
  onSecondaryAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  iconName,
  title,
  description,
  actionLabel,
  onAction,
  secondaryLabel,
  onSecondaryAction,
}) => {
  return (
    <div className="rounded-2xl border border-dashed border-neutral-300 dark:border-neutral-700 bg-white/60 dark:bg-neutral-900/40 p-10 text-center space-y-3">
      <div className="size-11 rounded-2xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center mx-auto">
        <Icon name={iconName} size={20} />
      </div>
      <h3 className="text-sm font-bold text-neutral-900 dark:text-white">{title}</h3>
      <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
      {(actionLabel || secondaryLabel) && (
        <div className="flex items-center justify-center gap-2 pt-2">
          {actionLabel && onAction && (
            <button
              type="button"
              onClick={onAction}
              className="px-4 py-2 rounded-lg bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
            >
              {actionLabel}
            </button>
          )}
          {secondaryLabel && onSecondaryAction && (
            <button
              type="button"
              onClick={onSecondaryAction}
              className="px-3.5 py-2 rounded-lg border border-neutral-200 dark:border-neutral-700 text-xs font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
