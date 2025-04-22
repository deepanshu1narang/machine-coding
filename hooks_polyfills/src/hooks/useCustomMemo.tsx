import { useEffect, useRef } from "react";

interface MemoizedRefInterface<T> {
  value: T;
  dependencies: unknown[] | null;
}

const areEqual = <T,>(prevDependencies: T, nextDependencies: T): boolean => {
  if (prevDependencies === null) {
    return false;
  }
  if (Array.isArray(prevDependencies) && Array.isArray(nextDependencies)) {
    if (prevDependencies.length !== nextDependencies.length) {
      return false;
    } else {
      for (let i = 0; i < prevDependencies.length; i++) {
        if (prevDependencies[i] !== nextDependencies[i]) {
          return false;
        }
      }
    }
  }
  return true;
};

const useCustomMemo = <T,>(cb: Function, dependencies: unknown[]): T => {
  //  vaariable or state ... cached value
  const memoizedRef = useRef<MemoizedRefInterface<T>>(null!);

  //   changes in dependencies
  if (!memoizedRef.current || !areEqual(memoizedRef.current.dependencies, dependencies)) {
    memoizedRef.current = {
      value: cb(),
      dependencies,
    };
  }

  //   cleanup logic
  useEffect(() => {
    return () => {
      memoizedRef.current = null!;
    };
  }, []);

  return memoizedRef.current.value;
};

export default useCustomMemo;
