import { createContext } from "react";
import Tool from "./tools/Tool";

type ToolContextType = {
  tool: Tool | null;
  setTool: React.Dispatch<React.SetStateAction<Tool | null>>;
};

const ToolContextState = {
  tool: null,
  setTool: () => {},
};

const ToolContext = createContext<ToolContextType>(ToolContextState);

type CanvasContextType = {
  canvas: HTMLCanvasElement | null;
  setCanvas: React.Dispatch<React.SetStateAction<HTMLCanvasElement | null>>;
};

const CanvasContexState = {
  canvas: null,
  setCanvas: () => {},
};

const CanvasContext = createContext<CanvasContextType>(CanvasContexState);

export { CanvasContext, ToolContext };
