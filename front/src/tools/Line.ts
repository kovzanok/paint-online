import { updateCanvasImage } from "../utils";
import Tool from "./Tool";

export default class Line extends Tool {
  private image!: string;
  private startX!: number;
  private startY!: number;
  constructor(toolParams: ToolParams) {
    super(toolParams);
    if (this.canvas) {
      this.canvas.onmousedown = this.handleMouseDown.bind(this);
      this.canvas.onmousemove = this.handleMove.bind(this);
      this.canvas.onmouseup = () => {
        this.isMouseDown = false;
      };
    }
  }

  private handleMouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    if (this.canvas) this.image = this.canvas.toDataURL();
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.ctx?.beginPath();
    this.ctx?.moveTo(e.offsetX, e.offsetY);
  }

  private handleMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(e.offsetX, e.offsetY);
    }
  }

  private draw(x: number, y: number) {
    if (!this.canvas) return;
    updateCanvasImage(this.image, this.canvas, () => {
      this.ctx?.beginPath();
      this.ctx?.moveTo(this.startX, this.startY);
      this.ctx?.lineTo(x, y);
      this.ctx?.stroke();
    });
  }
}
