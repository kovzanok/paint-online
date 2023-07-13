import { Dispatch, SetStateAction, createContext } from "react";
import Tool from "./tools/Tool";

const CanvasContext = createContext<
  | [
      HTMLCanvasElement | null,
      Dispatch<SetStateAction<HTMLCanvasElement | null>>
    ]
  | null
>(null);

const ToolContext = createContext<
  [Tool | null, Dispatch<SetStateAction<Tool | null>>] | null
>(null);

export { CanvasContext, ToolContext };
