import { useRef, useEffect, useContext } from "react";

import "../style/Canvas.scss";
import { CanvasContext, ToolContext } from "../context";
import Brush from "../tools/Brush";

export default function Canvas() {
  const context = useContext(CanvasContext);
  const toolContext = useContext(ToolContext);
  const setTool = toolContext?.[1];
  const setCanvas = context?.[1];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (setCanvas && canvasRef.current && setTool) {
      setCanvas(canvasRef.current);
      setTool(new Brush(canvasRef.current));
    }
  }, []);
  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={600} height={600} />
    </div>
  );
}
