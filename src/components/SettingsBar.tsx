import { useContext } from "react";
import { CanvasContext } from "../context";
import { useAppDispatch, useAppSelector, useToolUpdate } from "../hooks";
import { changeStroke, changeWeight } from "../store/slices/SettingsSlice";
import "../style/SettingsBar.scss";

export default function SettingsBar() {
  const dispatch = useAppDispatch();
  const updateTool = useToolUpdate();
  const { canvas } = useContext(CanvasContext);
  const settings = useAppSelector((state) => state.settings);
  const toolParams = { canvas, ...settings };

  return (
    <div className='settingsbar'>
      <ul className='settingsbar__list'>
        <li>
          <label className='settingsbar__label'>
            Line weight:
            <input
              onChange={(e) => {
                const weight = Number(e.target.value);
                dispatch(changeWeight(weight));
                updateTool({ ...toolParams, weight });
              }}
              min={1}
              max={50}
              defaultValue={1}
              type='number'
            />
          </label>
        </li>
        <li>
          <label className='settingsbar__label'>
            Stroke color:
            <input
              onChange={(e) => {
                const stroke = e.target.value;
                dispatch(changeStroke(stroke));
                updateTool({ ...toolParams, stroke });
              }}
              type='color'
            />
          </label>
        </li>
      </ul>
    </div>
  );
}
