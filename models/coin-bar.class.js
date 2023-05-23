class CoinBar extends MovableObject {
  img;

  IMAGES = [
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png",
    "img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES);
    this.initCoinBar();
  }

  /**
   * This function sets the x,y,width and height of the coinbar.
   */
  initCoinBar() {
    this.x = 410;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setCoinsBar(0);
  }

  /**
   * This function is to set the right picture to how much coin user collect.
   */
  setCoinsBar(count) {
    let path = this.IMAGES[count];
    this.img = this.imageCache[path];
  }
}
