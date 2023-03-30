class Collectable extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;
  coins;

  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
    this.x = -450 + Math.random() * (4600 - Math.random() * 10);
    this.y = 70 - Math.random();
  }
}
