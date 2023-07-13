export default class Tool {
  protected isMouseDown = false;
  protected ctx:CanvasRenderingContext2D | null;
  constructor(protected canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d');
  }

  resetHandlers() {
    this.canvas.onmousedown = null;
    this.canvas.onmouseup = null;
    this.canvas.onmousemove = null;
  }
}
