class Character extends MovableObject {
  heigth = 250;
  width = 150;
  y = 180;
  imageCounter = 0;
  speed = 14;
  camera_x = 0;

  world;
  IMAGES_WALKING = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  jump() {}

  animate() {
    setInterval(() => {
      if (keyboard.RIGHT && this.x < this.world.level.level_end) {
        this.x += this.speed;
        this.otherDirection = false;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (keyboard.LEFT && this.x >= -600) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
      this.world.camera_x = -this.x + 100;
    }, 1000 / 60);

    setInterval(() => {
      if (keyboard.RIGHT || keyboard.LEFT) {
        let i = this.imageCounter % this.IMAGES_WALKING.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren
        let path = this.IMAGES_WALKING[i];
        this.img = this.imageCache[path];
        this.imageCounter++;
      }
    }, 93);
  }
}
