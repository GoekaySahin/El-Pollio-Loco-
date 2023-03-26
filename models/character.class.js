class Character extends MovableObject {
  heigth = 250;
  width = 150;
  y = 180;
  imageCounter = 0;
  speed = 14;
  camera_x = 0;

  walking_sound = new Audio("../audio/walking.mp3");

  world;
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  jump() {}

  animate() {
    setInterval(() => {
      this.walking_sound.pause();
      if (keyboard.RIGHT && this.x < this.world.level.level_end) {
        this.x += this.speed;
        this.otherDirection = false;
        this.walking_sound.play();
      }
    }, 1000 / 60);

    setInterval(() => {
      if (keyboard.LEFT && this.x >= -600) {
        this.walking_sound.play();
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (keyboard.RIGHT || keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 93);
  }
}
