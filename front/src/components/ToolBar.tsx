import "../style/Toolbar.scss";
import BrushIcon from "../assets/BrushIcon.tsx";
import RectIcon from "../assets/RectIcon.tsx";
import CircleIcon from "../assets/CircleIcon.tsx";
import CustomButton from "./CustomButton.tsx";
import { changeColor, colorSelector } from "../store/slices/SettingsSlice.ts";
import { useAppDispatch, useAppSelector, useToolUpdate } from "../hooks.ts";
import LineIcon from "../assets/LineIcon.tsx";
import Brush from "../tools/Brush.ts";
import { useContext, useEffect, useRef } from "react";
import { CanvasContext, ToolContext } from "../context.ts";
import Rect from "../tools/Rect.ts";
import Tool from "../tools/Tool.ts";
import Line from "../tools/Line.ts";
import Circle from "../tools/Circle.ts";
import Erase from "../tools/Erase.ts";
import CustomRadioButton from "./CustomRadioButton.tsx";
import { updateCanvasImage } from "../utils.ts";

type ToolConstructorType = new (toolParams: ToolParams) => Tool;

export default function ToolBar() {
  const dispatch = useAppDispatch();
  const updateTool = useToolUpdate();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { canvas, undoList, setUndoList, redoList, setRedoList } =
    useContext(CanvasContext);
  const { setTool } = useContext(ToolContext);
  const settings = useAppSelector((state) => state.settings);
  const color = useAppSelector(colorSelector);

  const toolParams = { canvas, ...settings };

  const changeTool = (ToolConstructor: ToolConstructorType) => {
    setTool(new ToolConstructor(toolParams));
  };

  useEffect(() => {
    const input = inputRef.current;
    if (input) input.checked = true;
  }, []);

  const undo = () => {
    const undoListCopy = undoList.slice();
    const lastUndo = undoListCopy.pop();
    const ctx = canvas?.getContext("2d");
    if (!canvas) return;
    if (lastUndo) {
      setRedoList([...redoList, canvas.toDataURL()]);
      setUndoList(undoListCopy);
      updateCanvasImage(lastUndo, canvas);
    } else {
      ctx?.clearRect(0, 0, canvas?.width, canvas?.height);
    }
  };

  const redo = () => {
    const redoListCopy = redoList.slice();
    const lastRedo = redoListCopy.pop();
    if (!canvas) return;
    if (lastRedo) {
      setRedoList(redoListCopy);
      setUndoList([...undoList, canvas.toDataURL()]);
      updateCanvasImage(lastRedo, canvas);
    }
  };

  return (
    <div className='toolbar'>
      <ul className='toolbar__list'>
        <li>
          <CustomRadioButton
            ref={inputRef}
            id='brush'
            onChange={() => changeTool(Brush)}
          >
            <BrushIcon color={settings.stroke} />
          </CustomRadioButton>
        </li>
        <li>
          <CustomRadioButton id='line' onChange={() => changeTool(Line)}>
            <LineIcon color={settings.stroke} />
          </CustomRadioButton>
        </li>
        <li>
          <CustomRadioButton id='rect' onChange={() => changeTool(Rect)}>
            <RectIcon stroke={settings.stroke} color={settings.color} />
          </CustomRadioButton>
        </li>
        <li>
          <CustomRadioButton id='circle' onChange={() => changeTool(Circle)}>
            <CircleIcon stroke={settings.stroke} color={color} />
          </CustomRadioButton>
        </li>
        <li>
          <CustomRadioButton
            id='erase'
            onChange={() => changeTool(Erase)}
            className='label_erase'
          />
        </li>
        <li>
          <input
            onChange={(e) => {
              const color = e.target.value;
              dispatch(changeColor(color));
              updateTool({ ...toolParams, color });
            }}
            value={color}
            type='color'
          />
        </li>
      </ul>

      <ul className='toolbar__list'>
        <li>
          <CustomButton
            disabled={undoList.length === 0}
            onClick={undo}
            className='button_undo'
          />
        </li>
        <li>
          <CustomButton
            disabled={redoList.length == 0}
            onClick={redo}
            className='button_redo'
          />
        </li>
        <li>
          <CustomButton className='button_save' />
        </li>
      </ul>
    </div>
  );
}
