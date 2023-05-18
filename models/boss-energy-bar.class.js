class BossEnergyBar extends MovableObject {
  IMAGES = [
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
    "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
  ];

  constructor() {
    super().loadImages(this.IMAGES);
    this.initBossBar();
  }

  initBossBar() {
    this.x = 425;
    this.y = 320;
    this.height = 0;
    this.width = 0;
    this.showPower(5);
  }

  showPower(index) {
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }

  powerVisible() {
    setInterval(() => {
      if (!(this.height == 50)) {
        this.height += 5;
      }
      if (!(this.width == 220)) {
        this.width += 20;
      }
      if (!(this.y == 420)) {
        this.y += 10;
      }
    }, 100);
  }

  changePower() {
    this.showPower();
  }
}
