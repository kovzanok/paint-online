import "../style/Toolbar.scss";
import BrushIcon from "../assets/BrushIcon.tsx";
import RectIcon from "../assets/RectIcon.tsx";
import CircleIcon from "../assets/CircleIcon.tsx";
import CustomButton from "./CustomButton.tsx";
import { changeColor, colorSelector } from "../store/slices/SettingsSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks.ts";
import LineIcon from "../assets/LineIcon.tsx";
import Brush from "../tools/Brush.ts";
import { useContext } from "react";
import { CanvasContext, ToolContext } from "../context.ts";
import Rect from "../tools/Rect.ts";
import Tool from "../tools/Tool.ts";
import Line from "../tools/Line.ts";
import Circle from "../tools/Circle.ts";
import Erase from "../tools/Erase.ts";

type ToolConstructorType = new (toolParams: ToolParams) => Tool;

export default function ToolBar() {
  const { canvas } = useContext(CanvasContext);
  const { setTool } = useContext(ToolContext);
  const toolProps = useAppSelector((state) => state.settings);
  const color = useAppSelector(colorSelector);
  const dispatch = useAppDispatch();

  const changeTool = (ToolConstructor: ToolConstructorType) => {
    setTool(new ToolConstructor({ canvas, ...toolProps }));
  };
  return (
    <div className='toolbar'>
      <ul className='toolbar__list'>
        <li>
          <CustomButton onClick={() => changeTool(Brush)}>
            <BrushIcon color={toolProps.stroke} />
          </CustomButton>
        </li>
        <li>
          <CustomButton onClick={() => changeTool(Line)}>
            <LineIcon color={toolProps.stroke} />
          </CustomButton>
        </li>
        <li>
          <CustomButton onClick={() => changeTool(Rect)}>
            <RectIcon stroke={toolProps.stroke} color={toolProps.color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton onClick={() => changeTool(Circle)}>
            <CircleIcon stroke={toolProps.stroke} color={color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton
            onClick={() => changeTool(Erase)}
            className='button_erase'
          />
        </li>
        <li>
          <input
            onChange={(e) => {
              dispatch(changeColor(e.target.value));
            }}
            value={color}
            type='color'
          />
        </li>
      </ul>
      <ul className='toolbar__list'>
        <li>
          <CustomButton className='button_undo' />
        </li>
        <li>
          <CustomButton className='button_redo' />
        </li>
        <li>
          <CustomButton className='button_save' />
        </li>
      </ul>
    </div>
  );
}
