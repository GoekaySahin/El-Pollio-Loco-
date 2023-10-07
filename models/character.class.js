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
    this.initCharacter();
  }

  /**
   * This init function is to load the animated picture and the timer for idle
   */
  initCharacter() {
    this.loadImages(this.IDLE_IMAGES);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_SLEEPING);
    this.standTimer();
  }

  /**
   * This function is start the animation on the character
   */
  startCharacter() {
    this.animate();
    this.applyGravity();
  }

  /**
   * This function is checks wich animation is to play
   */
  animate() {
    setInterval(() => {
      this.walking_sound.pause();

      if (this.isHurt()) {
        this.hurt();
      }
      if (this.wantWalkRight() && !this.isDead()) {
        this.letWalkRight();
      }
      if (this.wantWalkLeft() && !this.isDead()) {
        this.letWalkLeft();
      }
      this.setCamera();
    }, 1000 / 60);

    this.letJump();
    this.checkDirection();
    this.startIDLE();
    this.dead();

    this.sleepingAnimation();
  }

  /**
   * This function is return if enboss is no more there any more
   * @returns if enboss is dead
   */
  enemyDead() {
    return !(world.level.enemies[world.level.enemies.length - 1].power == 0);
  }

  /**
   * This function is to check and if true than start animation of idle
   */
  startIDLE() {
    setInterval(() => {
      if (
        !this.notInteracting() &&
        !this.isHurt() &&
        !this.isAboveGround() &&
        this.enemyDead() &&
        this.power > 0
      ) {
        this.playAnimation(this.IDLE_IMAGES);
        this.IDLE = true;
      }
    }, 300);
  }

  /**
   * This function checks and returns if no interaction is happening
   * @returns idle
   */
  notInteracting() {
    if (!(keyboard.UP && keyboard.RIGHT && keyboard.LEFT && keyboard.SPACE));
    setTimeout(this.setIdleFalse, 150, this);
    return this.IDLE;
  }

  /**
   * This function checks if character can fall in sleep and let play the animation for sleeping
   */
  sleepingAnimation() {
    setInterval(() => {
      if (this.cleanSleep()) {
        this.playAnimation(this.IMAGES_SLEEPING);
      }
    }, 150);
  }

  /**
   * This function is to set the camera right
   */
  setCamera() {
    this.world.camera_x = -this.x + 100;
  }

  /**
   * This function is to check wich direction is at moment
   */
  checkDirection() {
    setInterval(() => {
      if (
        (keyboard.RIGHT && !this.isHurt()) ||
        (keyboard.LEFT && !this.isHurt())
      ) {
        this.playAnimation(this.IMAGES_WALKING);
        this.standTimer();
      }
      if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 150);
  }

  /**
   * This function is to let the character walk right if possible and play rigth animaition and sound
   */
  letWalkRight() {
    this.setIdleTrue();
    if (!this.isDead()) this.moveRight(this);
    if (this.onGround() && this.power > 0) {
      this.standTimer();
      this.playAudio(this.walking_sound);
    }
  }

  /**
   * This function is to let the character walk left if possible and play rigth animaion and sound
   */
  letWalkLeft() {
    this.setIdleTrue();
    this.turnLeft();
    this.moveLeft(this);
    this.standTimer();
    if (!this.isAboveGround() && this.power > 0) {
      this.playAudio(this.walking_sound);
    }
  }

  /**
   * This function checks if walking left is possible
   * @returns boolean if he is not on level end and keyboard left is down
   */
  wantWalkLeft() {
    return keyboard.LEFT && this.x >= -600 && !this.isDead();
  }

  /**
   * This function is checks if character is on ground
   * @returns boolean if character is not above ground
   */
  onGround() {
    return !this.isAboveGround();
  }

  /**
   * This function checks if it is possible to walk right
   * @returns boolean if keyboard is right down and not at end of world and not hurt
   */
  wantWalkRight() {
    return (
      keyboard.RIGHT &&
      this.x < this.world.level.level_end &&
      !this.isHurt() &&
      !this.isDead()
    );
  }

  /**
   * This function is to check and let character jump and play right sound and animation
   */
  letJump() {
    setInterval(() => {
      if (this.wantJump() && this.power > 0) {
        this.jump();
        this.playAudio(this.jump_sound);
        this.standTimer();
        this.playAnimation(this.IMAGES_JUMPING);
      }
    }, 180);
  }

  /**
   * This function returns if it is possible to jump
   * @returns boolean if keyboard is up and is on ground
   */
  wantJump() {
    return keyboard.UP && !this.isAboveGround();
  }

  /**
   * This function is to stop the walking sound
   */
  stopWalkingSound() {
    this.walking_sound.pause();
    this.walking_sound.currentTime = 0;
  }

  /**
   * This function is to check of character is dead and plays right animation and sound
   */
  dead() {
    setInterval(() => {
      if (this.isDead()) {
        this.stopWalkingSound();
        this.playAnimation(this.IMAGES_DEAD);
        this.playAudio(this.lose);
        this.playAudio(this.game_over);

        this.characterKill();
      }
    }, 120);
  }

  /**
   * This function is to set the variable true
   */
  setIdleTrue() {
    this.IDLE = true;
  }

  /**
   * This function is to set the variable an false
   * @param {object} x of character
   */
  setIdleFalse(x) {
    x.IDLE = false;
  }

  /**
   * This function is to play the hurt animation for character
   */
  hurt() {
    this.playAnimation(this.IMAGES_HURT);
    if (this.x > -600) {
      this.x -= 3;
    }
    if (!(this.power == this.powerControl)) {
      this.powerControl = this.power;
      this.playAudio(this.hurt_sound);
      this.standTimer();
    }
  }

  /**
   * This function returns the possibility if character can fall in sleep
   * @returns boolean if he is fall in sleep is on ground is not in near of endboss and is not hurt and have power
   */
  cleanSleep() {
    return (
      this.fallInSleep() &&
      !this.isAboveGround() &&
      this.x < 3000 &&
      !this.isHurt() &&
      this.power > 0
    );
  }

  /**
   * This function is to play the kill animation on character
   */
  characterKill() {
    this.y += 20;
    setTimeout(this.charaterImplode, 1050, this);
  }

  /**
   * This function is used to make the character invisible
   * @param {object} x of the character
   */
  charaterImplode(x) {
    x.width = 0;
    this.height = 0;
  }

  /**
   * This function return if chatacter is fall in sleep
   * @returns value and set xControl to character.x
   */
  characterInSleep() {
    return this.xControl == this.x;
  }

  /**
   * This function resets the time checker variable
   */
  standTimer() {
    this.standTime = new Date().getTime();
  }

  /**
   * This function is to check the time for sleep animation
   * @returns boolean if time passed over 4 sec
   */
  fallInSleep() {
    let timepassed = new Date().getTime() - this.standTime;
    timepassed = timepassed / 1000;
    return timepassed > 4;
  }
}
