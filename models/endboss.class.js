class Endboss extends MovableObject {
  width = 200;
  height = 340;
  y = 105;
  scream = "anderes";
  characterX = 0;
  power = 25;
  powerChecker = 25;
  hurtTimeBoss = false;

  offset = {
    top: 00,
    left: 0,
    right: 0,
    bottom: 0,
  };

  bossComimg_sound = new Audio("audio/chickenLoud.mp3");

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 4800;
    this.speed = 8 + Math.random() * 0.4;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.scream == "anderes") {
        this.alerta();
      } else if (this.x - this.characterX < 150) {
        this.attack();
        this.moveLeft();
      } else if (!(this.power == this.powerChecker) || this.hurtTimeBoss) {
        this.hurt();
        this.hurtTimeBoss = true;
        setTimeout(this.hurtTimeFalse, 800, this);
      } else if (this.power == 0 || this.power < 0) {
        this.dead();
      } else {
        this.walking(this);
      }
    }, 110);
  }
  5;

  hurtTimeFalse(x) {
    x.hurtTimeBoss = false;
  }

  alerta() {
    this.playAnimation(this.IMAGES_ALERT);

    this.speed = 12;
  }

  attack() {
    this.playAnimation(this.IMAGES_ATTACK);
    this.speed = 4;
  }

  dead() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  hurt() {
    this.playAnimation(this.IMAGES_HURT);
    this.playAnimation(this.IMAGES_HURT);
    this.playAnimation(this.IMAGES_HURT);
    this.playAnimation(this.IMAGES_HURT);
    this.powerChecker = this.power;
  }
  walking(bossChicken) {
    bossChicken.playAnimation(bossChicken.IMAGES_WALKING);
    this.speed = 12;
    bossChicken.moveLeft();
  }
}

// C:\Users\GÖKAY\Desktop\Aktuelles Projekt\El Pollo Loco\img\4_enemie_boss_chicken\2_alert\G5.png
