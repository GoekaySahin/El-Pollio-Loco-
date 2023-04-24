class Character extends MovableObject {
  height = 250;
  width = 150;
  y = 50;
  imageCounter = 0;
  speed = 14;
  camera_x = 0;

  offset = {
    top: 80,
    left: 40,
    right: 10,
    bottom: 10,
  };

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

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      if (keyboard.RIGHT && this.x < this.world.level.level_end) {
        this.moveRight();
        this.walking_sound.play();
      }
      if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
      } else if (keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }

      if (keyboard.LEFT && this.x >= -600) {
        this.walking_sound.play();
        this.turnLeft();
        this.moveLeft();
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (keyboard.RIGHT || keyboard.LEFT) {
        if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        } else {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 93);

    setInterval(() => {
      if (!this.isAboveGround()) {
        this.loadImage("../img/2_character_pepe/2_walk/W-21.png");
      }
    }, 500);
  }
}
