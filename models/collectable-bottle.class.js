class CollectableBottle extends MovableObject {
  x = -450;
  y = 70;
  width = 100;
  height = 80;
  bottle;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  constructor() {
    super().loadImage("img/6_salsa_bottle/1_salsa_bottle_on_ground.png");
    this.initBottle();
  }

  /**
   * This init functions to set the right x and y is randomly.
   */
  initBottle() {
    this.x = this.setX();
    this.y = 90 - Math.random() * 100;
  }

  /**
   * This functions is to set the right x for the coins randomly in a range between 250 and 4000 and returns it.
   */
  setX() {
    let result = 250 + Math.random() * (4000 - Math.random() * 10);
    if (result > -20 && result < 20) {
      this.setX();
    }
    return result;
  }
}
