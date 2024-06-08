import { MouseEvent } from "react";

const withStopPropagation = (fn: (e: MouseEvent) => void) => {
  return (e: MouseEvent) => {
    e.stopPropagation();
    fn(e);
  };
};

export default withStopPropagation;
