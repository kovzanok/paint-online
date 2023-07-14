import { useRef, useEffect, useContext } from "react";

import "../style/Canvas.scss";
import { CanvasContext, ToolContext } from "../context";
import Brush from "../tools/Brush";
import { useAppSelector } from "../hooks";

export default function Canvas() {
  const { canvas, setCanvas, undoList, setUndoList } =
    useContext(CanvasContext);
  const { setTool } = useContext(ToolContext);
  const settings = useAppSelector((state) => state.settings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (setCanvas && canvasRef.current && setTool) {
      setCanvas(canvasRef.current);
      setTool(new Brush({ canvas: canvasRef.current, ...settings }));
    }
  }, []);

  const mouseDonwHandler = () => {
    if (canvas) {
      const imgSrc = canvas.toDataURL();
      setUndoList([...undoList, imgSrc]);
    }
  };

  return (
    <div className='canvas'>
      <canvas
        onMouseDown={mouseDonwHandler}
        ref={canvasRef}
        width={600}
        height={600}
      />
    </div>
  );
}
