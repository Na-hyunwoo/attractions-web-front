import { useRef, useEffect } from "react";

export function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // useEffect는 컴포넌트가 렌더링 된 이후에 마운트가 됩니다.
  // 따라서, 위의 useEffect가 마운트 되기 전에 ref.current값을 리턴합니다. 
  return ref.current;
}