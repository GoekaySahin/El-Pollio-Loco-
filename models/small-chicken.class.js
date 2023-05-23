class SmallChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 370;
  power = 5;

  offset = {
    top: -10,
    left: -5,
    right: -5,
    bottom: 0,
  };

  chicken_smash = new Audio("audio/smallChickenLose.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().initSmallChicken();
  }

  /**
   * This init functions is to set the smallchickens.y and on x randomly.
   * Sets width and height and check if objcet is defin
   * @param {object}
   */
  initSmallChicken(x) {
    if (this == undefined) {
      x.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      x.loadImages(x.IMAGES_WALKING);
      x.loadImages(x.IMAGES_DEAD);
      x.x = 350 + Math.random() * 3000;
      x.animate();
    } else {
      this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 350 + Math.random() * 3000;
      this.animate();
    }
  }

  /**
   * This functions load the dead animation.
   */
  deadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * This functions is check wich aimation is to play in smallChicken.
   */
  animate() {
    setInterval(() => {
      if (this.power == 0 && this.height > 0) {
        this.deadChicken();
        this.playAudio(this.chicken_smash);
      } else {
        this.moveLeft(this);
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.power > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 110);
  }
}
