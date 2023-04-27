class World {
  level = level1;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;

  character = new Character();
  statusBar = new StatusBar();
  coinbar = new CoinBar();
  bottleBar = new BottleBar();
  collectable = new Collectable();
  bottle = new CollectableBottle();
  flyingBottle = new ThrowableObject();

  throwableObjcet = [];
  hitEnemyCollision = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.run();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.setCharacterX();
      this.checkCollisions();
      this.collectCoin();
      this.collectBottle();
      this.loudChicken();
      this.bottleToEnemy();
    }, 15);
  }

  setCharacterX() {
    this.level.enemies[this.level.enemies.length - 1].characterX =
      this.character.x;
  }

  bottleToEnemy() {
    if (this.character.isColliding(this.bottle)) {
      console.log("treffer");
    }
  }

  loudChicken() {
    if (
      this.character.x > 4350 &&
      this.level.enemies[this.level.enemies.length - 1].scream == "anderes"
    ) {
      this.level.enemies[this.level.enemies.length - 1].bossComimg_sound.play();
      this.level.enemies[this.level.enemies.length - 1].scream = true;
    }
  }

  doubleTimeChecker = false;
  interBottle;

  stopInter(inter) {
    clearInterval(inter);
  }

  handleKeyDown(event) {
    if (
      event.code === "Space" &&
      this.character.bottle > 0 &&
      !this.doubleTimeChecker
    ) {
      console.log("Leertaste wurde gedrückt");
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100
      );
      let i = 0;

      this.interBottle = setInterval(() => {
        if (this.checkCollisionBottle(bottle)) {
          debugger;
          console.log("treffer");
          this.stopInter(this.interBottle);
        }
      }, 100);

      this.throwableObjcet.push(bottle);
      this.character.bottle -= 1;
      this.bottleBar.showBottle(this.character.bottle);
      // Fügen Sie hier den Code hinzu, der nach einer Verzögerung ausgeführt werden soll
    }
  }

  falseCounter = 0;
  checkCollisionBottle(bottle) {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy, bottle)) {
        this.character.hitEnemy(enemy);

        this.character.killAnimation(enemy);
      } else if (this.falseCounter == 1000) {
        this.stopInter(this.interBottle);
        this.falseCounter = 0;
      } else {
        this.falseCounter++;
        console.log(this.character.isColliding(enemy, bottle));
      }
    });
  }

  /*   checkThrowableObjects() {
    if (
      keyboard.SPACE &&
      this.character.bottle > 0 &&
      !this.doubleTimeChecker
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100
      );
      this.doubleTimeChecker = true;
      this.setFalse();

      this.throwableObjcet.push(bottle);
      this.character.bottle -= 1;
      this.bottleBar.showBottle(this.character.bottle);
    }
  }
 */

  hitEnemyTrue(that) {
    that.hitEnemyCollision = false;
  }

  spliceEnemy(x, enemy) {
    x.level.enemies.splice(enemy, 1);
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.character.isColliding(enemy) && this.character.flyDown()) {
        this.character.hitEnemy(enemy);
        this.character.smalJump();
        this.character.tarePos();
        this.hitEnemyCollision = true;
        setTimeout(this.hitEnemyTrue, 250, this);
        if (enemy.width > 150 && enemy.power == 0) {
          setTimeout(this.spliceEnemy, 1600, this, i);
        } else if ((enemy.width < 150 && enemy.power == 0) || enemy.power < 0) {
          this.character.killAnimation(enemy);
          setTimeout(this.spliceEnemy, 250, this, i);
        }
      } else if (
        this.character.isColliding(enemy) &&
        !this.character.logTime() &&
        this.hitEnemyCollision == false
      ) {
        if (enemy.width > 150) {
          this.character.x - 30;
        }
        this.character.hit();
        this.statusBar.setPercentage(this.character.power);
        if (this.character.hurtTime()) {
          this.character.lastHit = 0;
        }
      }
    }); // schreiben / kein hurt wenn gegener hopz

    /* level1.enemies.forEach((enemy, i) => {
    if(enemy.x == obj.x){
        console.log('deez nuts');
        
    }
    }); */
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
        this.bottleBar.showBottle(this.character.countBottle());
        this.level.collectableBottle.splice(i, 1);
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
    this.ctx.translate(this.camera_x, 0); // <---- end

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
      obj.constructor.name ==
        this.level.enemies[this.level.enemies.length - 1].constructor.name
    );
  }
}
