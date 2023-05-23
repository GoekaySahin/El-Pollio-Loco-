class ThrowableObject extends MovableObject {
  IMAGES_BOTTLE_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_BOTTLE_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  x;
  y;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  bottle_splash_sound = new Audio("audio/drowBottle.mp3");
  enemy;
  speedX = 10;
  speedY = 20;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.initThrowable(x, y);
  }

  /**
   * This function is to set the bottle.x and y startpoint and widht and height.
   */
  initThrowable(x, y) {
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.throw();
  }

  /**
   * This function is to activate the gravity for the flyning bottle and checks if bottle is on bottom.
   */
  throw() {
    this.applyGravity();

    setInterval(() => {
      if (this.collision == true && this.width > 0) {
        this.bottleSplash();
      }
    }, 25);
    this.bottleFly();
  }

  /**
   * This function is to play the bottle flying animation.
   */
  bottleFly() {
    setInterval(() => {
      if (this.collision == false) {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += this.speedX;
      }
    }, 50);
  }

  /**
   * This function is the animation of the bottle when it splash on the bottom.
   */
  bottleSplash() {
    this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
    this.playAudio(this.bottle_splash_sound);
    setTimeout(this.splashFalse, 100, this);
    world.doubleTimeChecker = false;
  }

  /**
   * This function is to set the varibale on the check factors false.
   * @param {object}
   */
  splashFalse(x) {
    x.collision = false;
    x.bottleImplode(x);
  }

  /**
   * This function is to remove the bottle after it hits an enemy or the bottom.
   */
  bottleImplode(x) {
    x.width = 0;
    x.height = 0;
    x.x = 0;
    x.y = 0;
    x.speedX = 0;
    x.speedY = 0;
  }
}
