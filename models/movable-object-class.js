class MovableObject extends DrawableObject {
  speed = 0;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  power = 100;
  lastHit = 0;
  collision = false;
  coins = 0;
  bottle = 0;
  characterX;
  endboss_power = 25;
  sound = true;
  pos;
  startTime;
  endTime;

  get_bottle = new Audio("audio/getABottle.mp3");
  get_coins = new Audio("audio/collectCoins.mp3");

  applyGravity() {
    setInterval(() => {
      if ((this.isAboveGround() || this.speedY > 0) && this.power > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
      if (this.img.src.includes("pepe") && this.y > 182) {
        this.y = 182;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  moveRight(x) {
    if (x.power > 0) {
      x.x += this.speed;
      x.otherDirection = false;
    }
  }

  moveLeft(x) {
    if (x.power == undefined || x.power > 0) {
      /*     if (x instanceof SmallChicken) {
        this.speed = 1;
      }
      if (x instanceof Chicken) {
        this.speed = 1;
      } */
      x.x -= this.speed;
    }
  }

  playAnimation(images, x) {
    if (this.imageCounter == undefined) {
      let i = x.imageCounter % images.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren SEXY
      let path = images[i];
      x.img = x.imageCache[path];
      x.imageCounter++;
    } else {
      let i = this.imageCounter % images.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren SEXY
      let path = images[i];
      this.img = this.imageCache[path];
      this.imageCounter++;
    }
  }

  killAnimation(obj) {
    setInterval(() => {
      if (obj.height == 0 || obj.width == 0 || obj.y == 450) {
        return;
      }
      obj.width -= 5;
      obj.height -= 5;
      obj.y += 5;
      if (this.enemyImplode == undefined) {
        world.character.enemyImplode(obj);
      } else if (obj.width < 150) {
        setTimeout(this.enemyImplode(obj), 400);
      }
    }, 150);
  }

  enemyImplode(obj) {
    obj.x = 0;
    obj.y = 0;
    obj.width = 0;
    obj.height = 0;
  }

  turnLeft() {
    this.otherDirection = true;
  }

  jump() {
    this.speedY = 30;
    this.startTimeout();
  }

  smalJump() {
    this.speedY = 20;
    this.standTimer();
  }

  startTimeout() {
    this.startTime = Date.now() / 1000;

    setInterval(() => {
      this.flyDown();
      if (!(this.y == 182)) {
        this.endTimeout();
      } else if (this.y > 180) {
        this.clearTime();
      } else {
        return;
      }
    }, 100);
  }

  clearTime() {
    this.endTime = 0;
    this.startTime = 0;
  }

  endTimeout() {
    this.endTime = Date.now() / 1000;
    this.logTime();
  }

  flyDown() {
    if (this.power > 0) {
      if (this.y == 182) {
        this.pos = this.y;
      }
      if (this.y > this.pos) {
        return this.y > this.pos;
      } else {
        this.pos = this.y;
        setTimeout(this.flyDown, 100);
      }
    }
  }

  flyCheck(pos) {
    console.log(this.y > pos);
  }

  tarePos() {
    if (this.power > 0) {
      this.pos = this.y;
    }
  }

  logTime() {
    if (
      this.timeInAir > this.endTime - this.startTime &&
      this.endTime - this.startTime > this.land
    ) {
    }
    return (
      this.timeInAir > this.endTime - this.startTime &&
      this.endTime - this.startTime > this.land
    );
  }

  isColliding(obj, bottle) {
    if (bottle == null) {
      if (this.collects(obj)) {
        return this.collidingCollects(obj);
      } else {
        return this.collidingEnemy(obj);
      }
    } else {
      return this.collidingEnemyBottle(obj, bottle);
    }
  }

  collects(obj) {
    if (!(obj.src == undefined) && obj.img.src.includes("Collectable")) {
      return (
        obj.img.currentSrc.includes("coin") ||
        obj.img.currentSrc.includes("bottle")
      );
    }
  }

  collidingEnemy(obj) {
    return (
      obj.power > 0 &&
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left && // Rechts zu Links
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top && // Top zu Bottom
      this.y + this.offset.top <= obj.y + obj.height - this.offset.bottom // Bottom zu Top
    );
  }

  collidingEnemyBottle(obj, bottle) {
    return (
      bottle.x + bottle.width >= obj.x + obj.offset.left && // Rechts zu Links
      bottle.x <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      bottle.y + bottle.height >= obj.y + obj.offset.top && // Top zu Bottom
      bottle.y <= obj.y + obj.height // Bottom zu Top
    );
  }

  collidingCollects(obj) {
    return (
      this.x - 80 + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y + 130 <= obj.y + obj.height
    );
  }

  hit() {
    if (this.lastHit == 0) {
      this.power -= 20;
    }
    if (this.power <= 0) {
      this.power = 0;
    } else {
      if (this.lastHit == 0) {
        this.lastHit = new Date().getTime();
      }
    }
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  hurtTime() {
    return !this.isHurt();
  }

  isDead() {
    return this.power == 0;
  }

  getCoin() {
    if (this.coins > 5 || this.coins == 5) {
      return 5;
    }
    this.coins += 1;
    return this.coins;
  }

  hitEnemy(obj, bottle) {
    if (bottle == undefined) {
      obj.power -= 5;
    } else if (bottle.collision == false) {
      obj.power -= 5;
    }
    if (!(bottle == null) || !(bottle == undefined)) {
      bottle.collision = true;
    }
  }

  countBottle() {
    if (this.bottle > 5 || this.bottle == 5) {
      return 5;
    }
    this.bottle += 1;
    return this.bottle;
  }

  stopInter(inter) {
    clearInterval(inter);
  }

  playAudio(obj) {
    if (this.sound) {
      obj.play();
    }
  }
}
