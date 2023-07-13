import Tool from "./Tool";

export default class Rect extends Tool {
  private startX!: number;
  private startY!: number;
  private image!: string;
  constructor(canvas: HTMLCanvasElement) {
    super(canvas);
    this.canvas.onmousedown = this.handleMouseDown.bind(this);
    this.canvas.onmousemove = this.handleMove.bind(this);
    this.canvas.onmouseup = () => {
      this.isMouseDown = false;
    };
  }

  private handleMouseDown(e: MouseEvent) {
    this.isMouseDown = true;
    this.ctx?.beginPath();
    this.startX = e.offsetX;
    this.startY = e.offsetY;
    this.ctx?.moveTo(e.offsetX, e.offsetY);
    this.image = this.canvas.toDataURL();
  }

  private handleMove(e: MouseEvent) {
    if (this.isMouseDown) {
      this.draw(
        e.offsetX,
        e.offsetY,
        this.startX - e.offsetX,
        this.startY - e.offsetY
      );
    }
  }

  private draw(x: number, y: number, w: number, h: number) {
    const image = new Image();
    image.src = this.image;
    image.onload = () => {
      this.ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.drawImage(image, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx?.beginPath();
      this.ctx?.fillRect(x, y, w, h);
      this.ctx?.fill();
      this.ctx?.stroke();
    };
  }
}
