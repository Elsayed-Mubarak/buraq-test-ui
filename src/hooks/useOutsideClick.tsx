import { useEffect, useRef } from "react";


export function useOutsideClick(handler: () => void, listenCapturing = true) {
  const ref: React.MutableRefObject<HTMLDivElement | null> = useRef(null);

  useEffect(
    function () {
      function handleClick(e: any) {
        if (ref.current && !ref.current.contains(e.target)) {
          handler();
        }
      }

      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [handler, listenCapturing],
  );

  return ref;
}
