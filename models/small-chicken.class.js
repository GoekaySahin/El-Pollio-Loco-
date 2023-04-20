class SmallChicken extends MovableObject {
  width = 50;
  height = 50;
  y = 370;
  power = 5;

  offset = {
    top: 00,
    left: 0,
    right: 0,
    bottom: 0,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 200 + Math.random() * 5000;
    this.speed = 0.2 + Math.random() * 0.4;
    this.animate();
  }

  deadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  // https://daniela-scholz.developerakademie.net/el_pollo_loco/

  animate() {
    setInterval(() => {
      if (this.power == 0) {
        this.deadChicken();
      } else {
        this.moveLeft();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.power > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 110);
  }
}
