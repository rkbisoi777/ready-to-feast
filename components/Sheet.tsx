"use client";

import { useEffect, useRef } from "react";
import { CloseIcon } from "./Icons";

/**
 * Native <dialog> popup: slides up from the bottom on mobile, centred on larger
 * screens. Gives focus trapping and Esc-to-close for free.
 */
export default function Sheet({
  open,
  onClose,
  title,
  eyebrow,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      document.body.style.overflow = "hidden";
    } else if (!open && d.open) {
      d.close();
    }
  }, [open]);

  function handleClose() {
    if (!document.querySelector("dialog[open]")) document.body.style.overflow = "";
    onClose();
  }

  return (
    <dialog
      ref={ref}
      onClose={handleClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      aria-label={title}
      className="sheet m-0 mt-auto max-h-[90dvh] w-full max-w-none overflow-hidden rounded-t-3xl bg-white p-0 text-ink sm:m-auto sm:max-w-xl sm:rounded-3xl"
    >
      {open && (
        <div className="flex max-h-[90dvh] flex-col">
          <div className="mx-auto mt-2 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" aria-hidden />
          <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-3 sm:px-7 sm:py-4">
            <div className="min-w-0">
              {eyebrow && <p className="eyebrow">{eyebrow}</p>}
              <h2 className="truncate text-3xl">{title}</h2>
            </div>
            <button type="button" onClick={() => ref.current?.close()} className="-mr-2 shrink-0 rounded-full p-2 hover:bg-cream" aria-label="Close">
              <CloseIcon />
            </button>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">{children}</div>
          {footer && <div className="border-t border-ink/10 bg-cream-light px-5 py-4 sm:px-7">{footer}</div>}
        </div>
      )}
    </dialog>
  );
}
