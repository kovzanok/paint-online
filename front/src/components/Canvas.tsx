import { useRef, useEffect, useContext } from "react";
import "../style/Canvas.scss";
import { CanvasContext, ToolContext } from "../context";
import Brush from "../tools/Brush";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useParams } from "react-router-dom";
import { updateCanvasImage } from "../utils";
import { addToUndoList } from "../store/slices/CanvasImgSlice";

export default function Canvas() {
  const { canvas, setCanvas, socket, setSocket } = useContext(CanvasContext);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { setTool } = useContext(ToolContext);
  const settings = useAppSelector((state) => state.settings);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (setCanvas && canvasRef.current && setTool) {
      setCanvas(canvasRef.current);
      setTool(new Brush({ canvas: canvasRef.current, ...settings }));
    }
  }, []);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000");
    setSocket(socket);
    socket.onopen = () => {
      socket.send(
        JSON.stringify({
          method: "connection",
          id,
        })
      );
    };
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      switch (message.method) {
        case "connection":
          break;
        case "draw":
          const url = message.url;
          if (canvasRef.current) updateCanvasImage(url, canvasRef.current);
          break;
        default:
          break;
      }
    };
    return () => socket.close();
  }, []);

  const mouseDownHandler = () => {
    if (canvas) {
      dispatch(addToUndoList(canvas.toDataURL()));
    }
  };

  const mouseUpHandler = () => {
    if (canvas) {
      const imgUrl = canvas.toDataURL();
      socket?.send(JSON.stringify({ method: "draw", id, url: imgUrl }));
    }
  };

  return (
    <div className='canvas'>
      <canvas
        onMouseDown={mouseDownHandler}
        onMouseUp={mouseUpHandler}
        ref={canvasRef}
        width={600}
        height={600}
      />
    </div>
  );
}
