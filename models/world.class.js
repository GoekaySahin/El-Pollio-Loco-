class World {
  level = level1;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;
  game_start = false;

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

  setSpeed() {
    if (this.game_start) {
      world.level.enemies.forEach((enemy) => {
        enemy.speed = this.speed = 0.2 + Math.random() * 0.4;
      });
    }
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.setSpeed();
      this.setCharacterX();
      this.checkCollisions();
      this.collectCoin();
      this.collectBottle();
      this.loudChicken();
    }, 15);
  }

  setCharacterX() {
    this.level.enemies[this.level.enemies.length - 1].characterX =
      this.character.x;
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
      !this.doubleTimeChecker &&
      !this.character.otherDirection
    ) {
      let bottle = new ThrowableObject(
        this.character.x + 80,
        this.character.y + 100
      );

      /* this.interBottle = setInterval(() => {
        if (this.checkCollisionBottle(bottle)) {
          this.stopInter(this.interBottle);
        }
      }, 50); */
      this.checkCollisionBottle(bottle);

      this.throwableObjcet.push(bottle);
      this.character.bottle -= 1;
      this.bottleBar.showBottle(this.character.bottle);
      // Fügen Sie hier den Code hinzu, der nach einer Verzögerung ausgeführt werden soll
    }
  }

  falseCounter = 0;
  checkCollisionBottle(bottle) {
    setInterval(() => {
      this.level.enemies.forEach((enemy, i) => {
        enemy.offset.left = -15;
        enemy.offset.right = -15;
        if (bottle.y > 380 && bottle.y < 1000) {
          bottle.collision = true;
          bottle.speedY = 0;
          //setTimeout(bottle.splashFalse, 75, bottle);
        }
        if (this.character.isColliding(enemy, bottle) && enemy.width < 150) {
          this.character.hitEnemy(enemy, bottle);
          this.character.killAnimation(enemy);
          setTimeout(this.spliceEnemy, 250, this, i);
          /*           bottle.width = 0;
          bottle.height = 0;
          bottle.x = 0;
          bottle.y = 0;
          bottle.speedX = 0;
          bottle.speedY = 0; */
          bottle = 0;
        } else if (
          this.character.isColliding(enemy, bottle) &&
          enemy.width > 150 &&
          !this.level.enemies[this.level.enemies.length - 1].hurtTimeBoss
        ) {
          this.character.hitEnemy(enemy, bottle);
          if (enemy.power == 0) {
            setTimeout(this.killAnimation, 1000, enemy);
            setTimeout(this.spliceEnemy, 1800, this, i);
          }
        }
        enemy.offset.left = 0;
        enemy.offset.right = 0;
      });
    }, 75);
  }

  hitEnemyTrue(that) {
    that.hitEnemyCollision = false;
  }

  spliceEnemy(x, enemy) {
    //console.log("Not spliced :", x.level.enemies[enemy]);
    if (x.level.enemies[enemy].x == 0) {
      console.log(x.level.enemies[enemy], enemy);
      x.level.enemies.splice(enemy, 1);
    }
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
        if (enemy.width > 150 && enemy.x > -500) {
          this.character.x - 30;
        }
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
        this.character.get_coins.play();
      }
    });
  }

  collectBottle() {
    this.level.collectableBottle.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.bottleBar.showBottle(this.character.countBottle());
        this.level.collectableBottle.splice(i, 1);
        this.character.get_bottle.play();
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
    /*  if (this.figure(obj)) {
      //obj.drawFrame(this.ctx);
      return;
    } */

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
