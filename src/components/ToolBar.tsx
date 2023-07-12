import "../style/Toolbar.scss";
import BrushIcon from "../assets/BrushIcon.tsx";
import RectIcon from "../assets/RectIcon.tsx";
import CircleIcon from "../assets/CircleIcon.tsx";
import CustomButton from "./CustomButton.tsx";

export default function ToolBar() {
  return (
    <div className='toolbar'>
      <ul className='toolbar__list'>
        <li>
          <CustomButton>
            <BrushIcon />
          </CustomButton>
        </li>
        <li>
          <CustomButton>
            <RectIcon />
          </CustomButton>
        </li>
        <li>
          <CustomButton>
            <CircleIcon />
          </CustomButton>
        </li>
        <li>
          <CustomButton className='button_erase' />
        </li>
        <li>
          <input type='color' />
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
