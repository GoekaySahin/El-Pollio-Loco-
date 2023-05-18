class Chicken extends MovableObject {
  width = 50;
  height = 70;
  y = 350;
  power = 5;

  offset = {
    top: 00,
    left: -5,
    right: 0,
    bottom: 0,
  };

  get_smash = new Audio("audio/chickenLose.mp3");

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.initChicken();
  }

  startpointEnemy = 350;
  endPointEnemy = 3000;
  /*   firstPoint = 1850;
  secondPoint = 1850;
  thirdPoint = 1850;
  fourdPoint = 1850;
  fithdPoint = 1850;
  sixdPoint = 1850;
  sevendPoint = 1850;
  eightdPoint = 1850; */

  initChicken(x) {
    let point = this.startpointEnemy + Math.random() * this.endPointEnemy;
    point = Math.round(point);

    setInterval(() => {
      this.drawChickens(point);
    }, 100);
  }

  drawChickens(point) {
    if (!this.isEnemyAround(point)) {
    }
  }

  isEnemyAround(point) {
    level1.enemies.forEach((enemy, i) => {
      if (
        (point >= enemy.x + enemy.width + 700 ||
          point <= enemy.x - enemy.width - 700) &&
        this.x == 120 &&
        enemy instanceof Chicken
      ) {
        console.log(true);
        if (!this.checkIfXExist(i)) {
          this.x = point + 200;
          this.animate();
        }
      } else {
        return;
      }
    });
  }

  checkIfXExist(i) {
    level1.enemies.forEach((enemy) => {
      return (
        (i >= enemy.x + enemy.width + 350 ||
          i <= enemy.x - enemy.width - 350) &&
        this.x == 120
      );
    });
  }

  deadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  animate() {
    setInterval(() => {
      if (this.power == 0 && this.height > 0) {
        this.deadChicken();
        this.playAudio(this.get_smash);
      } else {
        this.moveLeft(this);
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.power > 0) {
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 300);
  }
}
