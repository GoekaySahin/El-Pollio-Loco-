class Chicken extends MovableObject {
  width = 50;
  height = 70;
  y = 350;
  power = 5;

  offset = {
    top: 0,
    left: -5,
    right: 0,
    bottom: 0,
  };

  startpointEnemy = 350;
  endPointEnemy = 3000;

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

  /**
   * This init function is to set the chicken.x randomly in a range beetween 350 and 3000.
   */
  initChicken() {
    this.x = 350 + Math.random() * 3000;
    this.animate();
  }

  /*   drawChickens(point) {
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
        }
      } else {
        return;
      }
    } );
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
  */

  /**
   * This function is to play the get killed animation fom chicken.
   */
  deadChicken() {
    this.playAnimation(this.IMAGES_DEAD);
  }

  /**
   * This function is to check and play the right animation for the chicken.
   */
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
