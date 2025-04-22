import { useEffect, useRef } from "react";

const usePrevious = <T,>(value: T): T => {
  let val = useRef<T>(null!);

  useEffect(() => {
    val.current = value;
  }, [value]);

  return val.current;
};

export default usePrevious;
