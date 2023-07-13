import Tool from "./Tool";

export default class Brush extends Tool {
  constructor(toolParams: ToolParams) {
    super(toolParams);
    console.log(toolParams);
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
    this.ctx?.moveTo(e.offsetX, e.offsetY);
  }

  private handleMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(e.offsetX, e.offsetY);
    }
  }

  private draw(x: number, y: number) {
    this.ctx?.lineTo(x, y);
    this.ctx?.stroke();
  }
}
