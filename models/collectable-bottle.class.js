class CollectableBottle extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;
  bottle;
  offset = {
    top: 00,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.x = this.setX(); //-450 + Math.random() * (4600 - Math.random() * 10);
    this.y = 90 - Math.random() * 100;
  }

  setX() {
    let result = 250 + Math.random() * (4000 - Math.random() * 10);
    if (result > -20 && result < 20) {
      this.setX();
    }
    return result;
  }
}
