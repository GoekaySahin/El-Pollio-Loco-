class Background extends MovableObject {
  width = 720;
  height = 480;

  constructor(path, x) {
    super().loadImage(path);

    this.initBackground(x);
  }

  initBackground(x) {
    this.x = x;
    this.y = 480 - this.height;
  }
}
