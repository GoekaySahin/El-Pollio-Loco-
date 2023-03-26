class Cloud extends MovableObject {
  width = 350;
  height = 250;
  y = 50;
  cloudIndex = 400;
  x = this.cloudIndex;

  constructor() {
    super().loadImage("img/5_background/layers/4_clouds/1.png");
    this.x = Math.random() * 400;
    this.animation();
  }

  animation() {
    this.moveLeft();
  }
}
