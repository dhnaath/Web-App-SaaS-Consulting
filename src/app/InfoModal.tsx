import { useEffect, useLayoutEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { HeaderNavPillItem } from "./shell-header";

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories?: readonly HeaderNavPillItem<any>[];
}

export function InfoModal({ isOpen, onClose, categories = [] }: InfoModalProps) {
  const [pos, setPos] = useState<{ top: number; left: number } | null>(null);

  useLayoutEffect(() => {
    if (!isOpen) return;

    const updatePosition = () => {
      const trigger = document.querySelector('[data-info-trigger="true"]') as HTMLElement | null;
      if (!trigger) {
        setPos(null);
        return;
      }
      const rect = trigger.getBoundingClientRect();
      const vw = window.innerWidth;
      const cardWidth = vw >= 640 ? 384 : 320;
      const margin = vw >= 640 ? 20 : 12;
      const idealLeft = rect.left + rect.width / 2 - cardWidth / 2;
      const left = Math.max(margin, Math.min(idealLeft, vw - cardWidth - margin));
      const top = rect.bottom + 10;
      setPos({ top, left });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          />

          <div
            className="fixed z-50 pointer-events-auto"
            style={
              pos
                ? { top: `${pos.top}px`, left: `${pos.left}px` }
                : { top: "68px", right: "20px" }
            }
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.16, ease: "easeOut" }}
              className="w-80 sm:w-96 rounded-3xl bg-white dark:bg-zinc-900 border border-neutral-200 dark:border-zinc-800 shadow-2xl p-2.5 flex flex-col overflow-hidden cursor-default text-left select-none max-h-[75vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1.5 overflow-y-auto no-scrollbar max-h-[60vh] px-0.5 py-0.5">
                {categories.length === 0 ? (
                  <div className="min-h-[160px] rounded-2xl bg-neutral-50/80 dark:bg-zinc-800/50 border border-neutral-200/70 dark:border-zinc-700/60 flex items-center justify-center">
                    <span className="text-xs text-neutral-400">Tidak ada kategori</span>
                  </div>
                ) : (
                  categories.map((cat) => (
                    <button
                      key={String(cat.id)}
                      type="button"
                      disabled
                      aria-disabled="true"
                      className="flex items-center justify-between w-full px-3.5 py-2.5 rounded-2xl text-left select-none cursor-not-allowed border bg-neutral-50 dark:bg-zinc-800 text-neutral-700 dark:text-neutral-200 shadow-xs border-neutral-200/70 dark:border-zinc-700/60 opacity-85"
                    >
                      <span className="text-[13px] font-medium tracking-tight truncate leading-tight text-neutral-800 dark:text-neutral-100">
                        {cat.label}
                      </span>
                      {cat.count !== undefined && (
                        <span className="text-[10.5px] font-semibold px-2 py-0.5 rounded-full bg-white dark:bg-zinc-700 text-neutral-600 dark:text-neutral-300 border border-neutral-200/60 dark:border-zinc-600/60 shrink-0 shadow-2xs">
                          {cat.count}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
