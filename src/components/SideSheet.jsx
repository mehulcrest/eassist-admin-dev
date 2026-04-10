import { X } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

const SideSheet = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  widthClass = "w-[500px]",
}) => {
  useEffect(() => {
    if (!isOpen || typeof document === "undefined") {
      return undefined;
    }

    const { body, documentElement } = document;
    const previousOverflow = body.style.overflow;
    const previousPaddingRight = body.style.paddingRight;
    const scrollbarWidth = window.innerWidth - documentElement.clientWidth;

    body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      body.style.overflow = previousOverflow;
      body.style.paddingRight = previousPaddingRight;
    };
  }, [isOpen]);

  if (typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
    >
      <button
        type="button"
        aria-label="Close sheet overlay"
        className={`absolute inset-0 bg-black/20 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute right-0 top-0 flex h-full overscroll-contain ${widthClass} max-w-[95vw] flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#EAECF0] px-4 py-3">
          <h2 className="text-2xl font-semibold text-[#344054]">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sheet"
            className="rounded p-1 text-[#667085] hover:bg-[#F2F4F7]"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4">{children}</div>

        {footer ? (
          <div className="border-t border-[#EAECF0] bg-white px-4 py-3">{footer}</div>
        ) : null}
      </aside>
    </div>,
    document.body
  );
};

export default SideSheet;
