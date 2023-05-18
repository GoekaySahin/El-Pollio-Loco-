class StatusBarEndbossIcon extends MovableObject {
  IMAGE = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  x = 422;
  y = 427;
  width = 0;
  height = 0;

  constructor() {
    super().loadImage(this.IMAGE[0]);
  }

  iconVisible(x) {
    x.bossIcon.width = 50;
    x.bossIcon.height = 50;
  }
}
