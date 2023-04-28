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

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  enemy;

  speedX = 20;
  speedY = 10;

  constructor(x, y) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_BOTTLE_ROTATION);
    this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    this.x = x;
    this.y = y;
    this.width = 60;
    this.height = 70;
    this.throw(100, 150);
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();
    setInterval(() => {
      this.x = this.x;
      if (this.collision == true) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        setTimeout(this.splashFalse, 250, this);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += 10;
      }
    }, 25);
  }

  splashFalse(x) {
    x.collision = false;
  }
}
