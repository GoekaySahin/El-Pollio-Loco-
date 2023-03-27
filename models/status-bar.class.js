class StatusBar extends DrawableObject {
  width = 100;
  height = 200;
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
    super();
    this.loadImages(this.IMAGES);
    this.x = 100;
    this.y = 100;
    this.setPercentage(100);
  }

  setPercentage(percent) {
    this.percent = percent;
    let index = percent / 20;
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }
}
