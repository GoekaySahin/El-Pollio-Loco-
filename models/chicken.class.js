class Chicken extends MovableObject {
  width = 50;
  height = 70;
  y = 350;
  power = 5;

  offset = {
    top: 00,
    left: -5,
    right: 0,
    bottom: 0,
  };

  get_smash = new Audio("audio/chickenLose.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 350 + Math.random() * 3000;
    this.animate();
  }

  deadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  animate() {
    setInterval(() => {
      if (this.power == 0 && this.height > 0) {
        this.deadChicken();
        this.playAudio(this.get_smash);
      } else {
        this.moveLeft(this);
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.power > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 300);
  }
}
