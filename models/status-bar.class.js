class StatusBar extends DrawableObject {
  img;
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  percent = 100;

  constructor() {
    super().loadImages(this.IMAGES);
    this.initStatusBar();
  }

  /**
   * This functions is to set the statusbar.x, y and width and height.
   */
  initStatusBar() {
    this.x = 10;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.setPercentage(100);
  }

  /**
   * This functions is to show the right picture.
   * @param {number}
   */
  setPercentage(percent) {
    this.percent = percent;
    let index = percent / 20;
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }
}
