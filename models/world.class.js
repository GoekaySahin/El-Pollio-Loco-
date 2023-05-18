class World {
  level = level1;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;
  game_start = false;
  falseCounter = 0;

  character = new Character();
  statusBar = new StatusBar();
  coinbar = new CoinBar();
  bottleBar = new BottleBar();
  bossBar = new BossEnergyBar();
  bossIcon = new StatusBarEndbossIcon();
  collectable = new Collectable();
  bottle = new CollectableBottle();
  flyingBottle = new ThrowableObject();

  throwableObjcet = [];
  hitEnemyCollision = false;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.initWorld(canvas, keyboard);
  }

  initWorld(canvas, keyboard) {
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
    if (this.comeToBoss()) {
      this.chickenScream();
    }
  }

  chickenScream() {
    this.character.playAudio(
      this.level.enemies[this.level.enemies.length - 1].bossComimg_sound
    );
    this.level.enemies[this.level.enemies.length - 1].scream = true;
    this.bossBar.powerVisible();
    setTimeout(this.bossIcon.iconVisible, 1000, this);
  }

  comeToBoss() {
    return (
      this.character.x > 4350 &&
      this.level.enemies[this.level.enemies.length - 1].scream == false
    );
  }

  doubleTimeChecker = false;
  interBottle;

  stopInter(inter) {
    clearInterval(inter);
  }

  checkSoundBottle(bottle) {
    if (this.character.sound == false) {
      bottle.sound = false;
    } else {
      bottle.sound = true;
    }
  }

  handleKeyDown(event) {
    if (this.possibilityToDrawBottle(event)) {
      this.drawBottle();
    }
  }

  drawBottle() {
    let bottle = new ThrowableObject(
      this.character.x + 80,
      this.character.y + 100
    );
    if (this.character.otherDirection) {
      world.flyingBottle.speedX = -15;
      bottle.speedX = -15;
      this.character.moveLeft(bottle);
    } else if (!this.character.otherDirection) {
      bottle.speedX = 20;
    }
    this.checkSoundBottle(bottle);
    this.character.standTimer();
    this.checkCollisionBottle(bottle);
    this.throwableObjcet.push(bottle);
    this.character.bottle -= 1;
    this.bottleBar.showBottle(this.character.bottle);
  }

  possibilityToDrawBottle(event) {
    return (
      event.code === "Space" &&
      this.character.bottle > 0 &&
      !this.doubleTimeChecker /* &&
      !this.character.otherDirection */
    );
  }

  checkCollisionBottle(bottle) {
    setInterval(() => {
      this.level.enemies.forEach((enemy, i) => {
        this.turnOffsetOn(enemy);
        if (this.bottleOnBottom(bottle)) {
          this.bottomSplash(bottle);
        }
        if (this.bottleOnChicken(enemy, bottle)) {
          this.bottleKillChicken(enemy, bottle, i);
        } else if (this.bottleOnBoss(enemy, bottle)) {
          this.bottleHitBoss(enemy, bottle, i);
        }
        this.turnOffsetOff(enemy);
      });
    }, 75);
  }

  bottleHitBoss(enemy, bottle, i) {
    this.character.hitEnemy(enemy, bottle);
    let energy = enemy.power / 5;
    this.bossBar.showPower(energy);
    if (enemy.power == 0) {
      setTimeout(this.killAnimation, 1000, enemy);
      setTimeout(this.spliceEnemy, 1800, this, i);
    }
  }

  bottleOnBoss(enemy, bottle) {
    return (
      this.character.isColliding(enemy, bottle) &&
      enemy.width > 150 &&
      !this.level.enemies[this.level.enemies.length - 1].hurtTimeBoss &&
      this.character.x <= enemy.x
    );
  }

  bottleKillChicken(enemy, bottle, i) {
    this.character.hitEnemy(enemy, bottle);
    if (this.level.enemies[i].x == enemy.x) {
      this.character.killAnimation(enemy);
    }
    setTimeout(this.spliceEnemy, 650, this, i);

    bottle = 0;
  }

  bottleOnChicken(enemy, bottle) {
    return this.character.isColliding(enemy, bottle) && enemy.width < 150;
  }

  bottomSplash(bottle) {
    bottle.collision = true;
    bottle.speedY = 0;
  }

  bottleOnBottom(bottle) {
    return bottle.y > 380 && bottle.y < 1000;
  }

  turnOffsetOff(enemy) {
    enemy.offset.left = 0;
    enemy.offset.right = 0;
  }

  turnOffsetOn(enemy) {
    if (enemy.width > 150) {
      enemy.offset.left = 30;
    } else {
      enemy.offset.left = 0;
      enemy.offset.right = 0;
    }
  }

  hitEnemyTrue(that) {
    that.hitEnemyCollision = false;
  }

  spliceEnemy(y, enemy) {
    if (world.level.enemies[enemy] == undefined) {
      return;
    }
    if (world.level.enemies[enemy].x == 0) {
      world.level.enemies.splice(enemy, 1);
    }
  }

  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.characterJumpsOnHead(enemy)) {
        this.damageOrDead(enemy, i);
      } else if (this.characterGetsHit(enemy)) {
        this.characterGetsHitAnimation();
      }
    });
  }

  characterGetsHitAnimation() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.power);
    if (this.character.hurtTime()) {
      this.character.lastHit = 0;
    }
  }

  characterGetsHit(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.logTime() &&
      this.hitEnemyCollision == false
    );
  }

  damageOrDead(enemy, i) {
    this.character.hitEnemy(enemy);
    this.character.smalJump();
    this.character.tarePos();
    this.hitEnemyCollision = true;
    setTimeout(this.hitEnemyTrue, 250, this);
    this.checkEnemy(enemy, i);
  }

  checkEnemy(enemy, i) {
    if (enemy.width > 150) {
      let energy = enemy.power / 5;
      this.bossBar.showPower(energy);
      if (enemy.power == 0) {
        setTimeout(this.spliceEnemy, 1600, this, i);
      }
    } else if ((enemy.width < 150 && enemy.power == 0) || enemy.power < 0) {
      this.character.killAnimation(enemy);
      setTimeout(this.spliceEnemy, 1050, this, i);
    }
  }

  characterJumpsOnHead(enemy) {
    return this.character.isColliding(enemy) && this.character.flyDown();
  }

  collectCoin() {
    this.level.collectable.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coinbar.setCoinsBar(this.character.getCoin());
        this.level.collectable.splice(i, 1);
        this.character.playAudio(this.character.get_coins);
      }
    });
  }

  collectBottle() {
    this.level.collectableBottle.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.bottleBar.showBottle(this.character.countBottle());
        this.level.collectableBottle.splice(i, 1);
        this.character.playAudio(this.character.get_bottle);
      }
    });
  }

  draw() {
    this.drawStartSet();
    this.collectAndBackground();
    this.drawCharacter();
    /////// SPACE FOR FIXED OBJECTS //////////
    this.fixObj();
    // <---- end

    this.bottleAndEnemys();
    this.ctx.translate(-this.camera_x, 0);

    // Draw wird immer wieder aufgerufen
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  bottleAndEnemys() {
    this.addObjectToMap(this.throwableObjcet);
    this.addObjectToMap(this.level.enemies);
  }

  fixObj() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bossBar);
    this.addToMap(this.bossIcon);
    this.ctx.translate(this.camera_x, 0);
  }

  drawCharacter() {
    this.addToMap(this.character);
  }

  collectAndBackground() {
    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.cloud, 50);
    this.addObjectToMap(this.level.collectable);
    this.addObjectToMap(this.level.collectableBottle);
  }

  drawStartSet() {
    if (this.canvas == undefined) {
      this.canvas = canvas;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
  }

  addToMap(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);

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
