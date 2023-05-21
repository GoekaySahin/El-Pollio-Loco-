class Endboss extends MovableObject {
  width = 200;
  height = 340;
  y = 105;
  scream = false;
  characterX = 0;
  power = 25;
  powerChecker = 25;
  hurtTimeBoss = false;

  boss_dead_guitar = new Audio("audio/guitar.mp3");
  boss_dead_applaud = new Audio("audio/applaud.mp3");

  offset = {
    top: 00,
    left: 15,
    right: 10,
    bottom: 0,
  };

  bossComimg_sound = new Audio("audio/chickenLoud.mp3");
  boss_hurt_sound = new Audio("audio/bossHurt.mp3");
  boss_dead_sound = new Audio("audio/winGame.mp3");

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
    super().initEndboss();
  }

  initEndboss(x) {
    if (this == undefined) {
      x.loadImage(x.IMAGES_ALERT[0]);
      x.loadImages(x.IMAGES_ALERT);
      x.loadImages(x.IMAGES_WALKING);
      x.loadImages(x.IMAGES_ATTACK);
      x.loadImages(x.IMAGES_HURT);
      x.loadImages(x.IMAGES_DEAD);
      x.x = 4800;
      x.speed = 8 + Math.random() * 0.4;
      x.animate();
    } else {
      this.loadImage(this.IMAGES_ALERT[0]);
      this.loadImages(this.IMAGES_ALERT);
      this.loadImages(this.IMAGES_WALKING);
      this.loadImages(this.IMAGES_ATTACK);
      this.loadImages(this.IMAGES_HURT);
      this.loadImages(this.IMAGES_DEAD);
      this.x = 4800;
      this.speed = 8 + Math.random() * 0.4;
      this.animate();
    }
  }

  animate() {
    setInterval(() => {
      if (this.watingForPepe()) {
        this.alerta();
      } else if (this.checkAttack()) {
        this.startAttack();
      } else if (this.powerNotEqual()) {
        this.getHurt();
      } else if (this.checkBossPower()) {
        this.deadAnimation();
      } else {
        this.walking(this);
      }
    }, 90);
  }

  deadAnimation() {
    this.dead();
    this.playAudio(this.boss_dead_sound);
    setTimeout(this.winningSound, 800, this);
  }

  checkBossPower() {
    return this.power <= 0 && this.width > 0;
  }

  getHurt() {
    this.hurt();
    this.playAudio(this.boss_hurt_sound);
    if (!this.hurtTimeBoss) {
      this.hurtTimeBoss = true;
    }
  }

  powerNotEqual() {
    return !(this.power == this.powerChecker);
  }

  startAttack() {
    this.attack();
    this.moveLeft(this);
  }

  watingForPepe() {
    return this.scream == false;
  }

  checkAttack() {
    return (
      this.power == this.powerChecker &&
      this.x - this.characterX < 150 &&
      !this.hurtTimeBoss &&
      this.power > 0
    );
  }

  hurtTimeFalse(x) {
    x.hurtTimeBoss = false;
    x.powerChecker = x.power;
  }
  hurtTimeTrue(x) {
    x.hurtTimeBoss = true;
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
    setTimeout(this.implodeBoss, 1500, this);
  }

  implodeBoss(x) {
    x.width = 0;
  }

  hurt() {
    this.playAnimation(this.IMAGES_HURT);

    setTimeout(this.hurtTimeFalse, 800, this);
  }
  walking(bossChicken) {
    bossChicken.playAnimation(bossChicken.IMAGES_WALKING);
    this.speed = 12;
    bossChicken.moveLeft(bossChicken);
  }

  winningSound(x) {
    if (x.width > 0) {
      x.playAudio(x.boss_dead_applaud);
    }
  }
}
