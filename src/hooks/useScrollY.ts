import { useEffect, useState } from "react";

export default function useScrollY() {
  const [currentY, setCurrentY] = useState<number>(0);

  const updateCurrentYState = () => {
    setCurrentY(window.scrollY);
  };

  useEffect(() => {
    updateCurrentYState();
    window.addEventListener("scroll", updateCurrentYState);

    return () => {
      window.removeEventListener("scroll", updateCurrentYState);
    };
  }, []);

  return currentY;
}
