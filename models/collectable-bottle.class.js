class CollectableBottle extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = -450 + Math.random() * (4600 - Math.random() * 10);
    this.y = 90 - Math.random() * 100;
  }
}
