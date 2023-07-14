export const updateCanvasImage = (
  imageUrl: string,
  canvas: HTMLCanvasElement,
  onloadCallback?: () => void
) => {
  const url = imageUrl;
  const img = new Image();
  img.src = url;
  img.onload = () => {
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    }
    if (onloadCallback) onloadCallback();
  };
};
