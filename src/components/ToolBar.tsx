import "../style/Toolbar.scss";
import BrushIcon from "../assets/BrushIcon.tsx";
import RectIcon from "../assets/RectIcon.tsx";
import CircleIcon from "../assets/CircleIcon.tsx";
import CustomButton from "./CustomButton.tsx";
import {
  changeColor,
  colorSelector,
} from "../store/slices/SettingsSlice.ts";
import { useAppDispatch, useAppSelector } from "../hooks.ts";
import LineIcon from "../assets/LineIcon.tsx";
import Brush from "../tools/Brush.ts";
import { useContext } from "react";
import { CanvasContext, ToolContext } from "../context.ts";
import Rect from "../tools/Rect.ts";

export default function ToolBar() {
  const context = useContext(CanvasContext);
  const toolContext = useContext(ToolContext);
  const canvas = context?.[0];
  const setTool = toolContext?.[1];
  const color = useAppSelector(colorSelector);
  const dispatch = useAppDispatch();
  return (
    <div className='toolbar'>
      <ul className='toolbar__list'>
        <li>
          <CustomButton
            onClick={() => canvas && setTool && setTool(new Brush(canvas))}
          >
            <BrushIcon color={color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton>
            <LineIcon color={color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton
            onClick={() => canvas && setTool && setTool(new Rect(canvas))}
          >
            <RectIcon color={color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton>
            <CircleIcon color={color} />
          </CustomButton>
        </li>
        <li>
          <CustomButton className='button_erase' />
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
