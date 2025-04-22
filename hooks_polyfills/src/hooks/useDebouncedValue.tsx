import { useCallback, useRef } from "react";

const useDebouncedValue = (fn: Function, delay: number) => {
  const timeoutRef = useRef<number | null>(null); // Store timeout across renders

  const debouncedFn = useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = window.setTimeout(() => {
        fn(...args);
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default useDebouncedValue;
