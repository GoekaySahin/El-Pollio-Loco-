class Collectable extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;
  coins;
  offset = {
    top: 00,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
    this.initCollects();
  }

  initCollects() {
    this.x = this.setX();
    this.y = 70 - Math.random();
  }

  setX() {
    let result = 250 + Math.random() * (4000 - Math.random() * 10);
    if (result > -20 && result < 20) {
      this.setX();
    }
    return result;
  }
}
