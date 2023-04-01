class World {
  character = new Character();
  level = level1;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;
  statusBar = new StatusBar();
  coinbar = new CoinBar();
  bottleBar = new BottleBar();
  throwableObjcet = [];
  collectable = new Collectable();
  bottle = new CollectableBottle();

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.run();
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkThrowableObjects();
      this.checkCollisions();
      this.collectCoin();
      this.collectBottle();
    }, 90);
  }

  checkThrowableObjects() {
    if (keyboard.SPACE) {
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100
      );
      this.throwableObjcet.push(bottle);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.character.hit();
        this.statusBar.setPercentage(this.character.power);
        if (this.character.hurtTime()) {
          this.character.lastHit = 0;
        }
      }
    });
  }

  collectCoin() {
    this.level.collectable.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coinbar.setCoinsBar(this.character.getCoin());
        this.level.collectable.splice(i, 1);
      }
    });
  }

  collectBottle() {
    this.level.collectableBottle.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.coinbar.setBottleBar(this.character.countBottle());
        this.level.collectable.splice(i, 1);
      }
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.cloud, 50);
    this.addObjectToMap(this.level.collectable);
    this.addObjectToMap(this.level.collectableBottle);

    this.addToMap(this.character);

    this.ctx.translate(-this.camera_x, 0);
    /////// SPACE FOR FIXED OBJECTS //////////
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinbar);
    this.ctx.translate(this.camera_x, 0); // <---- endd

    this.addObjectToMap(this.throwableObjcet);
    this.addObjectToMap(this.level.enemies);
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
      this.flipImage(obj);
    }

    obj.draw(this.ctx);
    if (this.figure(obj)) {
      obj.drawFrame(this.ctx);
    }

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }
  addObjectToMap(objs) {
    objs.forEach((element) => {
      this.addToMap(element);
    });
  }

  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  figure(obj) {
    return (
      obj == this.character ||
      obj.constructor.name == this.level.enemies[0].constructor.name ||
      obj.constructor.name == this.level.enemies[4].constructor.name
    );
  }
}
