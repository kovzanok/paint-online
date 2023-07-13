import { Dispatch, SetStateAction, createContext } from "react";

const CanvasContext = createContext<
  [HTMLCanvasElement | null, Dispatch<SetStateAction<HTMLCanvasElement | null>>] | null
>(null);

export default CanvasContext;
