export default class Tool {
  protected canvas: HTMLCanvasElement | null;
  protected color: string;
  protected stroke: string;
  protected weight: number;
  protected isMouseDown = false;
  protected ctx: CanvasRenderingContext2D | null | undefined;
  constructor({ canvas, color, stroke, weight }: ToolParams) {
    this.canvas = canvas;
    this.color = color;
    this.stroke = stroke;
    this.weight = weight;
    this.ctx = canvas?.getContext("2d");
    if (this.ctx) {
      this.ctx.lineWidth = this.weight;
      this.ctx.strokeStyle = this.stroke;
      this.ctx.fillStyle = this.color;
    }
  }

  resetHandlers() {
    if (this.canvas) {
      this.canvas.onmousedown = null;
      this.canvas.onmouseup = null;
      this.canvas.onmousemove = null;
    }
  }
}
