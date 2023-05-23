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

  /**
   * This init function is to set the boss energy bars x,y and width with heigth.
   */
  initBossBar() {
    this.x = 425;
    this.y = 320;
    this.height = 0;
    this.width = 0;
    this.showPower(5);
  }

  /**
   * This function is to show the picture of boss energy level.
   */

  showPower(index) {
    let path = this.IMAGES[index];
    this.img = this.imageCache[path];
  }

  /**
   * This function is to make the powerbar visible with a small animation.
   */

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

  /**
   * This function is set the right power level.
   */
  changePower() {
    this.showPower();
  }
}
