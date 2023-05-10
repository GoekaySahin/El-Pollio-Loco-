class BossEnergyBar extends MovableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  power = 5;

  constructor() {
    super();
    this.loadImages(this.IMAGES);
    this.x = 425;
    this.y = 420;
    this.height = 50;
    this.width = 220;
    this.showPower();
  }

  showPower() {
    let path = this.IMAGES[this.power];
    this.img = this.imageCache[path];
  }

  changePower() {
    this.power -= 5;
    this.showPower();
  }
}
