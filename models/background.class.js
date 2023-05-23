class Background extends MovableObject {
  width = 720;
  height = 480;

  constructor(path, x) {
    super().loadImage(path);

    this.initBackground(x);
  }

  /**
   * This init function is to set the background.x and his height.
   */

  initBackground(x) {
    this.x = x;
    this.y = 480 - this.height;
  }
}
