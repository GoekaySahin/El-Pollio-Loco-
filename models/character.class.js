class Character extends MovableObject {
  height = 250;
  width = 150;
  y = 50;
  imageCounter = 0;
  speed = 8;
  camera_x = 0;
  powerControl = 100;
  standTime;
  IDLE = false;

  offset = {
    top: 80,
    left: 30,
    right: 50,
    bottom: 10,
  };

  walking_sound = new Audio("audio/walking.mp3");
  game_over = new Audio("audio/gameOver.mp3");
  hurt_sound = new Audio("audio/hurt.mp3");
  jump_sound = new Audio("audio/jump.mp3");
  lose = new Audio("audio/lose.mp3");

  world;

  IMAGE_GAME_OVER = "img/9_intro_outro_screens/game_over/game over!.png";

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_SLEEPING = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
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

  IDLE_IMAGES = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  constructor() {
    super().loadImage("img/2_character_pepe/1_idle/idle/I-1.png");
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEPING);
    this.standTimer();
  }

  startCharacter() {
    this.animate();
    this.applyGravity();
  }

  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.isHurt()) {
        this.hurt();
      } else if (this.wantJump()) {
        this.letJump();
      }
      if (this.wantWalkRight()) {
        this.letWalkRight();
      }
      if (this.wantWalkLeft()) {
        this.letWalkLeft();
      }
      this.setCamera();
    }, 1000 / 60);

    this.checkDirection();
    this.startIDLE();
    this.dead();

    this.sleepingAnimation();
  }

  enemyDead() {
    return !(world.level.enemies[world.level.enemies.length - 1].power == 0);
  }

  startIDLE() {
    setInterval(() => {
      if (
        !this.notInteracting() &&
        !(this.isHurt() && !this.isAboveGround()) &&
        this.enemyDead()
      ) {
        this.playAnimation(this.IDLE_IMAGES);
        this.IDLE = true;
      }
    }, 150);
  }

  notInteracting() {
    if (!(keyboard.UP && keyboard.RIGHT && keyboard.LEFT && keyboard.SPACE));
    setTimeout(this.setIdleFalse, 150, this);
    return this.IDLE;
  }

  sleepingAnimation() {
    setInterval(() => {
      if (this.cleanSleep()) {
        this.playAnimation(this.IMAGES_SLEEPING);
      }
    }, 150);
  }

  setCamera() {
    this.world.camera_x = -this.x + 100;
  }

  checkDirection() {
    setInterval(() => {
      if (keyboard.RIGHT || keyboard.LEFT) {
        this.playAnimation(this.IMAGES_WALKING);
        this.standTimer();
      }
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 93);
  }

  letWalkRight() {
    this.setIdleTrue();
    this.moveRight(this);
    if (this.onGround()) {
      this.standTimer();
      this.playAudio(this.walking_sound);
    }
  }

  letWalkLeft() {
    this.setIdleTrue();
    this.turnLeft();
    this.moveLeft(this);
    this.standTimer();
    if (!this.isAboveGround()) {
      this.playAudio(this.walking_sound);
    }
  }

  wantWalkLeft() {
    return keyboard.LEFT && this.x >= -600;
  }

  onGround() {
    return !this.isAboveGround();
  }

  wantWalkRight() {
    return (
      keyboard.RIGHT && this.x < this.world.level.level_end && !this.isHurt()
    );
  }

  letJump() {
    this.jump();
    this.playAudio(this.jump_sound);
    this.standTimer();
  }

  wantJump() {
    return keyboard.UP && !this.isAboveGround();
  }

  dead() {
    setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        this.keyboardDeactivate();
        if (this.width > 0) {
          this.playAudio(this.lose);
          this.playAudio(this.game_over);
        }
        this.characterKill();
      }
    }, 120);
  }

  setIdleTrue() {
    this.IDLE = true;
  }

  setIdleFalse(x) {
    x.IDLE = false;
  }

  hurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.x -= 3;
    if (!(this.power == this.powerControl)) {
      this.powerControl = this.power;
      this.playAudio(this.hurt_sound);
      this.standTimer();
    }
  }

  cleanSleep() {
    return (
      this.fallInSleep() &&
      !this.isAboveGround() &&
      this.x < 3000 &&
      !this.isHurt() &&
      this.power > 0
    );
  }

  characterKill() {
    this.y += 20;
    setTimeout(this.charaterImplode, 250, this);
  }

  charaterImplode(x) {
    x.width = 0;
    this.height = 0;
  }

  characterInSleep() {
    return this.xControl == this.x;
  }

  standTimer() {
    this.standTime = new Date().getTime();
  }

  fallInSleep() {
    let timepassed = new Date().getTime() - this.standTime;
    timepassed = timepassed / 1000;
    return timepassed > 4;
  }

  keyboardDeactivate() {
    keyboard.UP = false;
    keyboard.RIGHT = false;
    keyboard.LEFT = false;
    keyboard.SPACE = false;
  }
}
