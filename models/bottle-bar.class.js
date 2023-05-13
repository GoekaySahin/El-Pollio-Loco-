class BottleBar extends MovableObject {
  img;

  IMAGES = [
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png",
    "img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 210;
    this.y = 0;
    this.width = 200;
    this.height = 50;
    this.showBottle(0);
  }

  showBottle(count) {
    let path = this.IMAGES[count];
    this.img = this.imageCache[path];
  }
}
