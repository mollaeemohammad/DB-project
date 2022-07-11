import { useState, useRef, useCallback, useEffect } from "react";

export const useStateCallback = <T>(
  initialState?: T
): [T | undefined, (state: T, cb: any) => void] => {
  const [state, setState] = useState<T | undefined>(initialState);
  const cbRef = useRef<any>(null); // init mutable ref container for callbacks

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store current, passed callback in ref
    setState(state);
  }, []); // keep object reference stable, exactly like `useState`

  useEffect(() => {
    // cb.current is `null` on initial render,
    // so we only invoke callback on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
};
