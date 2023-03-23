class Cloud2 extends MovableObject {
  width = 250;
  heigth = 200;
  y = 100;
  x = Math.random() * 400;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/2.png");
  }
}
