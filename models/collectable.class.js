class Collectable extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;
  coins;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor() {
    super().loadImage("img/8_coin/coin_2.png");
    this.initCollects();
  }

  /**
   * This function set the rigth x and y for the coins to collect.
   *
   * */
  initCollects() {
    this.x = this.setX();
    this.y = 70 - Math.random();
  }

  /**
   * This function returns random x postitions.
   */
  setX() {
    let result = 250 + Math.random() * (4000 - Math.random() * 10);
    if (result > -20 && result < 20) {
      this.setX();
    }
    return result;
  }
}
