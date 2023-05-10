class StatusBarEndbossIcon extends MovableObject {
  IMAGE = ["img/7_statusbars/3_icons/icon_health_endboss.png"];

  x = 422;
  y = 427;
  width = 50;
  height = 50;

  constructor() {
    super();
    this.loadImage(this.IMAGE[0]);
  }
}
