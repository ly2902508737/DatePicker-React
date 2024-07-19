// hooks/useWindowResize.ts
import { useEffect } from "react";

type ResizeHandler = () => void;

export default function useWindowResize(resizeHandler: ResizeHandler) {
  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);
}
