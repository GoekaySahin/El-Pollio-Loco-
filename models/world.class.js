class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud(), new Cloud(), new Cloud()];
  /*   clouds2 = [new Cloud2(), new Cloud2(), new Cloud2()]; */

  background = [];

  camera_x = 0;
  canvas;
  ctx;
  keyboard;
  png;
  distance;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.generateBackground();
  }

  setFirstBG(i) {
    this.background.push(
      new Background(
        `../img/5_background/layers/1_first_layer/${this.png}.png`,
        this.distance * i
      )
    );
  }

  setSecondBG(i) {
    this.background.push(
      new Background(
        `../img/5_background/layers/2_second_layer/${this.png}.png`,
        this.distance * i
      )
    );
  }

  setThirdBG(i) {
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
      this.setSecondBG(i);
      this.setThirdBG(i);
      this.setFirstBG(i);
      if (this.png == 1) {
        this.png = 2;
      } else {
        this.png = 1;
      }
    }
  }

  setWorld() {
    this.character.world = this;
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.background);
    this.addToMap(this.character);
    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.clouds, 50);
    this.ctx.translate(-this.camera_x, 0);

    /*     this.addObjectToMap(this.clouds2); */

    // Draw wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }
  addToMap(obj) {
    if (obj.otherDirection) {
      this.ctx.save();
      this.ctx.translate(obj.width, 0);
      this.ctx.scale(-1, 1);
      obj.x = obj.x * -1;
    }
    this.ctx.drawImage(obj.img, obj.x, obj.y, obj.width, obj.heigth);
    if (obj.otherDirection) {
      obj.x = obj.x * -1;
      this.ctx.restore();
    }
  }
  addObjectToMap(objs) {
    objs.forEach((element) => {
      this.addToMap(element);
    });
  }
}
