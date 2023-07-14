import { updateCanvasImage } from "../utils";
import Tool from "./Tool";

export default class Circle extends Tool {
  private startX!: number;
  private startY!: number;
  private image!: string;
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
    this.ctx?.beginPath();
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.ctx?.moveTo(e.offsetX, e.offsetY);
    if (this.canvas) this.image = this.canvas.toDataURL();
  }

  private handleMove(e: MouseEvent) {
    if (this.isMouseDown) {
      const radius = Math.sqrt(
        (this.startX - e.offsetX) ** 2 + (this.startY - e.offsetY) ** 2
      );
      this.draw(e.offsetX, e.offsetY, radius);
    }
  }

  private draw(x: number, y: number, r: number) {
    if (!this.canvas) return;
    updateCanvasImage(this.image, this.canvas, () => {
      this.ctx?.beginPath();
      this.ctx?.arc(x, y, r, 0, 2 * Math.PI);
      this.ctx?.fill();
      this.ctx?.stroke();
    });
  }
}
