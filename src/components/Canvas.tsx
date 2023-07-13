import { useRef, useEffect, useContext } from "react";

import "../style/Canvas.scss";
import CanvasContext from "../context";

export default function Canvas() {
  const context = useContext(CanvasContext);

  const setCanvas = context?.[1];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (setCanvas) {
      setCanvas(canvasRef.current);
    }
  }, []);
  return (
    <div className='canvas'>
      <canvas ref={canvasRef} width={600} height={600} />
    </div>
  );
}
