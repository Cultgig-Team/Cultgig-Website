import { useEffect } from "react";
export function useFocusTrap(
  ref: React.RefObject<HTMLElement | null>,
  active: boolean,
  onEscape: () => void,
) {
  useEffect(() => {
    if (!active) return;
    const node = ref.current;
    if (!node) return;
    const previous = document.activeElement as HTMLElement;
    const keys = (event: KeyboardEvent) => {
      if (event.key === "Escape") onEscape();
      if (event.key === "Tab") {
        const focusable = [
          ...node.querySelectorAll<HTMLElement>(
            "button:not([disabled]),a[href],input:not([disabled]),textarea:not([disabled])",
          ),
        ];
        if (!focusable.length) return;
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", keys);
    document.body.style.overflow = "hidden";
    setTimeout(
      () => node.querySelector<HTMLElement>("button,input,textarea,a")?.focus(),
      0,
    );
    return () => {
      document.removeEventListener("keydown", keys);
      document.body.style.overflow = "";
      previous?.focus();
    };
  }, [ref, active, onEscape]);
}
