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
    top: -20,
    left: -20,
    right: 0,
    bottom: 0,
  };

  bottle_splash_sound = new Audio("audio/drowBottle.mp3");
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
    this.throw();
  }

  throw() {
    this.speedY = 20;
    this.applyGravity();

    setInterval(() => {
      this.x = this.x;
      if (this.collision == true && this.width > 0) {
        this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        this.bottle_splash_sound.play();
        setTimeout(this.splashFalse, 100, this);
      } else {
        this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        this.x += 10;
      }
    }, 25);
  }

  splashFalse(x) {
    x.collision = false;
    x.bottleImplode(x);
  }

  bottleImplode(x) {
    x.width = 0;
    x.height = 0;
    x.x = 0;
    x.y = 0;
  }
}
