class Level {
  enemies;
  cloud;
  background;
  level_end = 1000;

  constructor(enemies, clouds, background) {
    this.enemies = enemies;
    this.cloud = clouds;
    this.background = background;
  }

  /* setFirstBG(i) {
    this.background.push(
      new Background(
        `../img/5_background/layers/1_first_layer/${this.png}.png`,
        this.distance * i
      )
    );
  } */

  /*   setSecondBG(i) {
    this.background.push(
      new Background(
        `../img/5_background/layers/2_second_layer/${this.png}.png`,
        this.distance * i
      )
    );
  }
 */
  /*   setThirdBG(i) {
    this.background.push(
      new Background(
        `../img/5_background/layers/3_third_layer/${this.png}.png`,
        this.distance * i
      )
    );
  }

  setAir(i) {
    this.background.push(
      new Background("../img/5_background/layers/air.png", this.distance * i)
    );
  }

  generateBackground() {
    this.png = 1;

    this.distance = 719;
    for (let i = -1; i < 10; i++) {
      this.setAir(i);
      this.setThirdBG(i);
      this.setSecondBG(i);
      this.setFirstBG(i);
      if (this.png == 1) {
        this.png = 2;
      } else {
        this.png = 1;
      }
    }
  } */
}
