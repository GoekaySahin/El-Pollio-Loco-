class Background extends MovableObject {
  width = 720;
  height = canvas.height;

  constructor(path, x) {
    super().loadImage(path);
    this.x = x;
    this.y = 480 - this.height;
  }
}
