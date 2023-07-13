import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import Tool from "./tools/Tool";
import { useContext } from "react";
import { ToolContext } from "./context";

type ToolConstructorType = new (toolParams: ToolParams) => Tool;

const getToolConstuctor = (tool: Tool): ToolConstructorType =>
  Object.getPrototypeOf(tool).constructor;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useToolUpdate = () => {
  const { tool, setTool } = useContext(ToolContext);
  const toolConstructor = tool && getToolConstuctor(tool);
  const updateTool = (toolParams: ToolParams) => {
    if (toolConstructor) setTool(new toolConstructor(toolParams));
  };
  return updateTool;
};
