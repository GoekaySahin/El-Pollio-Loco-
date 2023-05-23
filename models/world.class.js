class World {
  level = level1;
  game_start = false;
  camera_x = 0;
  canvas;
  ctx;
  keyboard;
  falseCounter = 0;
  doubleTimeChecker = false;
  interBottle;

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

  /**
   * This init function is to set the standart setting for the world.
   */
  initWorld(canvas, keyboard) {
    this.canvas = canvas;
    this.draw();
    this.keyboard = keyboard;
    this.setWorld();
    this.run();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  /**
   * This function is to start enemy animtion (let them walk).
   */
  setSpeed() {
    if (this.game_start) {
      world.level.enemies.forEach((enemy) => {
        enemy.speed = this.speed = 0.2 + Math.random() * 0.4;
      });
    }
  }

  /**
   * This function is to set the variable that will needed after.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * This function starts intevals that needed to play.
   */
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

  /**
   * This function sets a variable on endboss to check if character is in near of endboss.
   */
  setCharacterX() {
    this.level.enemies[this.level.enemies.length - 1].characterX =
      this.character.x;
  }

  /**
   * This function checks if character is near endboss.
   */
  loudChicken() {
    if (this.comeToBoss()) {
      this.chickenScream();
    }
  }

  /**
   * This function is plays the loud chicken sound if character is near and load the nedboss energy bar.
   */
  chickenScream() {
    this.character.playAudio(
      this.level.enemies[this.level.enemies.length - 1].bossComimg_sound
    );
    this.level.enemies[this.level.enemies.length - 1].scream = true;
    this.bossBar.powerVisible();
    setTimeout(this.bossIcon.iconVisible, 1000, this);
  }

  /**
   * This function is to stop the loud screaming chicken from sreaming a second time.
   */
  comeToBoss() {
    return (
      this.character.x > 4350 &&
      this.level.enemies[this.level.enemies.length - 1].scream == false
    );
  }

  /**
   * This function is tops intervall of animation.
   * @param {variable}
   */
  stopInter(inter) {
    clearInterval(inter);
  }

  /**
   * This function checks if bottle sound is playing.
   * @param {object}
   */
  checkSoundBottle(bottle) {
    if (this.character.sound == false) {
      bottle.sound = false;
    } else {
      bottle.sound = true;
    }
  }

  /**
   * This function is to check possibility to throw an bottle.
   */
  handleKeyDown(event) {
    if (this.possibilityToDrawBottle(event)) {
      this.drawBottle();
    }
  }

  /**
   * This function creats a new bottle to thow.
   */
  drawBottle() {
    this.doubleTimeChecker = true;
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
    bottleThrowSettings(bottle);
  }

  /**
   * This function makes the settings to make throw of bottle possible.
   * ^@param {object}
   */
  bottleThrowSettings(bottle) {
    this.checkSoundBottle(bottle);
    this.character.standTimer();
    this.checkCollisionBottle(bottle);
    this.throwableObjcet.push(bottle);
    this.character.bottle -= 1;
    this.bottleBar.showBottle(this.character.bottle);
  }

  /**
   * This function checks after clicking space, if it is possiblity to throw.
   * @param {event}
   */
  possibilityToDrawBottle(event) {
    return (
      event.code === "Space" &&
      this.character.bottle > 0 &&
      !this.doubleTimeChecker /* &&
      !this.character.otherDirection */
    );
  }

  /**
   * This function is checks if collision with bottle happen and in what a way.
   * @param {object}
   */
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

  /**
   * This function plays if bottle have hit boss to reduce power or check if boss is dead.
   * @param {object, object, number}
   */
  bottleHitBoss(enemy, bottle, i) {
    this.character.hitEnemy(enemy, bottle);
    let energy = enemy.power / 5;
    this.bossBar.showPower(energy);
    if (enemy.power == 0) {
      setTimeout(this.killAnimation, 1000, enemy);
      setTimeout(this.spliceEnemy, 1800, this, i);

      gameOver();
    }
  }

  /**
   * This function returns if bottle hits boss.
   */
  bottleOnBoss(enemy, bottle) {
    return (
      this.character.isColliding(enemy, bottle) &&
      enemy.width > 150 &&
      !this.level.enemies[this.level.enemies.length - 1].hurtTimeBoss
    );
  }

  /**
   * This function plays if a bottle hits a chicken top play the dead animation and reduce power.
   * @param {object, object, number}
   */
  bottleKillChicken(enemy, bottle, i) {
    this.character.hitEnemy(enemy, bottle);
    if (this.level.enemies[i].x == enemy.x && enemy.power == 0) {
      setTimeout(this.character.killAnimation, 350, enemy);
    }
    setTimeout(this.spliceEnemy, 650, this, i);

    bottle = 0;
  }

  /**
   * This function returns if bottle is colliding on chicken.
   */
  bottleOnChicken(enemy, bottle) {
    return this.character.isColliding(enemy, bottle) && enemy.width < 150;
  }

  /**
   * This function sets var for bottle splash on true and stops speed.
   * @param {object}
   */
  bottomSplash(bottle) {
    bottle.collision = true;
    bottle.speedY = 0;
  }

  /**
   * This function is returns if bottle hits bottom.
   * @param {object}
   */
  bottleOnBottom(bottle) {
    return bottle.y > 380 && bottle.y < 1000;
  }

  /**
   * This function turns the setoff off.
   * @param {object}
   */
  turnOffsetOff(enemy) {
    enemy.offset.left = 0;
    enemy.offset.right = 0;
  }

  /**
   * This function turns the offset on.
   * @param {object}
   */
  turnOffsetOn(enemy) {
    if (enemy.width > 150) {
      enemy.offset.left = 25;
    } else {
      enemy.offset.left = 0;
      enemy.offset.right = 0;
    }
  }

  /**
   * This function is to set the var on false.
   * @param {object}
   */
  hitEnemyTrue(that) {
    that.hitEnemyCollision = false;
  }

  /**
   * This function is to splice the enemy after dead animation.
   * @param {object}
   */
  spliceEnemy(enemy) {
    if (world.level.enemies[enemy] == undefined) {
      return;
    }
    if (world.level.enemies[enemy].x == 0) {
      world.level.enemies.splice(enemy, 1);
    }
  }

  /**
   * This function is permanent checking if any enemy has a collsion.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy, i) => {
      if (this.characterJumpsOnHead(enemy)) {
        this.damageOrDead(enemy, i);
      } else if (this.characterGetsHit(enemy)) {
        this.characterGetsHitAnimation();
      }
    });
  }

  /**
   * This function gets played if character gets hit, reduce power and start hurttime in wich he cant hurt a second time.
   */
  characterGetsHitAnimation() {
    this.character.hit();
    this.statusBar.setPercentage(this.character.power);
    if (this.character.hurtTime()) {
      this.character.lastHit = 0;
    }
  }

  /**
   * This function is to return the hit situation with character and enemy.
   * @param {object}
   */
  characterGetsHit(enemy) {
    return (
      this.character.isColliding(enemy) &&
      !this.character.logTime() &&
      this.hitEnemyCollision == false
    );
  }

  /**
   * This function checks if enemy is dead or get damge(endboss) after jump on head :)
   */
  damageOrDead(enemy, i) {
    this.character.hitEnemy(enemy);
    this.character.smalJump();
    this.character.tarePos();
    this.hitEnemyCollision = true;
    setTimeout(this.hitEnemyTrue, 250, this);
    this.checkEnemy(enemy, i);
  }

  /**
   * This function is to splice the nemy after get killed.
   */
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

  /**
   * This function returns if character is juumping on head of enemy.
   * @param {object}
   */
  characterJumpsOnHead(enemy) {
    return this.character.isColliding(enemy) && this.character.flyDown();
  }

  /**
   * This function checks if character is colliding with coins and play sound after that and splice the coins.
   */
  collectCoin() {
    this.level.collectable.forEach((coin, i) => {
      if (this.character.isColliding(coin)) {
        this.coinbar.setCoinsBar(this.character.getCoin());
        this.level.collectable.splice(i, 1);
        this.character.playAudio(this.character.get_coins);
      }
    });
  }

  /**
   * This function checks if colliding with bottle, play sound and splice the bottle.
   */
  collectBottle() {
    this.level.collectableBottle.forEach((bottle, i) => {
      if (this.character.isColliding(bottle)) {
        this.bottleBar.showBottle(this.character.countBottle());
        this.level.collectableBottle.splice(i, 1);
        this.character.playAudio(this.character.get_bottle);
      }
    });
  }

  /**
   * This function draws the level.
   */
  draw() {
    this.drawStartSet();
    this.collectAndBackground();
    this.drawCharacter();
    /////// SPACE FOR FIXED OBJECTS //////////
    this.fixObj();
    // <---- end

    this.bottleAndEnemys();
    this.ctx.translate(-this.camera_x, 0);

    // Draw wird immer wieder aufgerufen.
    self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function add the objects to the mao (canvas).
   */
  bottleAndEnemys() {
    this.addObjectToMap(this.throwableObjcet);
    this.addObjectToMap(this.level.enemies);
  }

  /**
   * This function is for the fix objects like bars.
   */
  fixObj() {
    this.ctx.translate(-this.camera_x, 0);
    this.addToMap(this.bottleBar);
    this.addToMap(this.statusBar);
    this.addToMap(this.coinbar);
    this.addToMap(this.bossBar);
    this.addToMap(this.bossIcon);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * This function is to draw the character.
   */
  drawCharacter() {
    this.addToMap(this.character);
  }

  /**
   * This function is to draw the background and the collectable and colletable bottle.
   */
  collectAndBackground() {
    this.addObjectToMap(this.level.background);
    this.addObjectToMap(this.level.cloud, 50);
    this.addObjectToMap(this.level.collectable);
    this.addObjectToMap(this.level.collectableBottle);
  }

  /**
   * This function is checks the canvas and starts to draw.
   */
  drawStartSet() {
    if (this.canvas == undefined) {
      this.canvas = canvas;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * This function is for change picture of character if he walks left or right.
   */
  addToMap(obj) {
    if (obj.otherDirection) {
      this.flipImage(obj);
    }

    obj.draw(this.ctx);

    if (obj.otherDirection) {
      this.flipImageBack(obj);
    }
  }

  /**
   * This function loads the objects to addToMap.
   * @param {object}
   */
  addObjectToMap(objs) {
    objs.forEach((element) => {
      this.addToMap(element);
    });
  }

  /**
   * This function is to flip the image in the way the obj walks.
   * @param {object}
   */
  flipImage(obj) {
    this.ctx.save();
    this.ctx.translate(obj.width, 0);
    this.ctx.scale(-1, 1);
    obj.x = obj.x * -1;
  }

  /**
   * This function is to flip the image of the object back to the right way.
   * @param {object}
   */
  flipImageBack(obj) {
    obj.x = obj.x * -1;
    this.ctx.restore();
  }

  /**
   * This function returns the actual object.
   * @param {object}
   */
  figure(obj) {
    return (
      obj == this.character ||
      obj.constructor.name == this.level.enemies[0].constructor.name ||
      obj.constructor.name ==
        this.level.enemies[this.level.enemies.length - 1].constructor.name
    );
  }
}
