class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  power = 100;
  lastHit = 0;
  collision;
  coins = 0;
  bottle = 0;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
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

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.imageCounter % images.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren SEXY
    let path = images[i];
    this.img = this.imageCache[path];
    this.imageCounter++;
  }

  killAnimation(obj) {
    setInterval(() => {
      if (obj.height == 0 || obj.width == 0 || obj.y == 450) {
        return;
      }
      obj.width -= 5;
      obj.height -= 15;
      obj.y += 20;
    }, 50);
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
  }

  startTime;
  endTime;

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

  pos;
  flyDown() {
    if (this.y == 182) {
      this.pos = this.y;
    }
    if (this.y > this.pos) {
      return this.y > this.pos;
    } else {
      this.pos = this.y;
      setTimeout(this.flyDown, 100);
    } /// KILLER MRK DER SCHAUT OB DER CHARACTER GERADE AM FALLEN IST SEXY MOTHER FUCKER
  }

  flyCheck(pos) {
    console.log(this.y > pos);
  }

  tarePos() {
    this.pos = this.y;
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

  // umschreiben
  isColliding(obj, bottle) {
    if (bottle == null) {
      if (this.collects(obj)) {
        return this.collidingCollects(obj);
      } else {
        return this.collidingEnemy(obj);
      }
    } else {
      this.collidingEnemyBottle(obj, bottle);
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
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left && // Rechts zu Links
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top && // Top zu Bottom
      this.y + this.offset.top <= obj.y + obj.height - this.offset.bottom // Bottom zu Top
    );
  }

  collidingEnemyBottle(obj, bottle) {
    return (
      bottle.x + bottle.width - this.offset.right >= obj.x + obj.offset.left && // Rechts zu Links
      bottle.x + this.offset.left <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      bottle.y + bottle.height - this.offset.bottom >= obj.y + obj.offset.top && // Top zu Bottom
      bottle.y + this.offset.top <= obj.y + obj.height - this.offset.bottom // Bottom zu Top
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
    this.coins += 1;
    return this.coins;
  }

  hitEnemy(obj) {
    obj.power -= 5;
  }

  countBottle() {
    this.bottle += 1;
    return this.bottle;
  }

  spliceEnemy(i) {
    level1.enemies.splice(i, 1);
  }
}
