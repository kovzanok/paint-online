import Tool from "./Tool";

export default class Line extends Tool {
  private image!: string;
  private startX!: number;
  private startY!: number;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMove.bind(this);
    this.canvas.onmouseup = () => {
      this.isMouseDown = false;
    };
    if (this.ctx) {
      this.ctx.strokeStyle = "black";
    }
  }

  private handleMouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    this.image = this.canvas.toDataURL();
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
    const image = new Image();
    image.src = this.image;
    image.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.moveTo(this.startX, this.startY);
      this.ctx?.lineTo(x, y);
      this.ctx?.stroke();
    };
  }
}
