class Endboss extends MovableObject {
  width = 100;
  height = 170;
  y = 255;
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
    "img/4_enemie_boss_chicken/3_attack/G21.png",
    "img/4_enemie_boss_chicken/3_attack/G22.png",
    "img/4_enemie_boss_chicken/3_attack/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/3_attack/G24.png",
    "img/4_enemie_boss_chicken/3_attack/G25.png",
    "img/4_enemie_boss_chicken/3_attack/G26.png",
  ];

  bossComimg_sound = new Audio("../audio/chickenLoud.mp3");

  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_ALERT);
    this.x = 4800;
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.endBoss()) {
        this.bossComimg_sound.play();
      }
      this.playAnimation(this.IMAGES_ALERT);
    }, 110);
  }
}

// C:\Users\GÖKAY\Desktop\Aktuelles Projekt\El Pollo Loco\img\4_enemie_boss_chicken\2_alert\G5.png
