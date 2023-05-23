class Cloud extends MovableObject {
  width = 350;
  height = 250;
  y = 50;
  cloudIndex = 400;
  x = this.cloudIndex;

  constructor() {
    super().initCloud();
  }

  /**
   * This function is to load the right picture for the background cloud, set the cloud.x and animat it.
   */
  initCloud() {
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 400;
    this.animation();
  }

  /**
   * This function animat the clouds to turn slowly to left.
   */
  animation() {
    this.moveLeft(this);
  }
}
