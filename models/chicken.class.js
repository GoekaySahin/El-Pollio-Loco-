class Chicken extends MovableObject {
  width = 50;
  heigth = 70;
  y = 350;
  imagesCounter = 0;
  IMAGES_CHICKEN = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_CHICKEN);
    this.speed = 0.2 + Math.random() * 0.4;
    this.x = 200 + Math.random() * 500;
    this.animate();
  }

  animate() {
    this.moveLeft();
    setInterval(() => {
      let i = this.imagesCounter % this.IMAGES_CHICKEN.length;
      let path = this.IMAGES_CHICKEN[i];
      this.img = this.imageCache[path];
      this.imagesCounter++;
    }, 110);
  }
}
