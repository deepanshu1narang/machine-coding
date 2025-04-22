import { useRef } from "react";

const useCustomEffect = (effect: Function, dependencies?: unknown[]): Function | undefined => {
  const isFirstRender = useRef(true);
  const prevDependencies = useRef<unknown[] | undefined>([]);

  // first render
  if (isFirstRender.current) {
    isFirstRender.current = false;
    effect();
    return;
  }

  // dependencies changes and no dependencies array
  const depsChanged = dependencies ? JSON.stringify(dependencies) !== JSON.stringify(prevDependencies.current) : true;

  if (depsChanged) {
    effect();
  }

  // cleanup

  //   to track whenever dependecies change... basically now we are saying ... now the value of previous dependencies got updated to the current ones
  prevDependencies.current = dependencies || [];
};

export default useCustomEffect;
