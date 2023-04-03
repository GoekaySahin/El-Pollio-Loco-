class MovableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2;
  power = 100;
  lastHit = 0;
  firstTime = true;
  coins = 0;
  bottle = 0;
  timeInAir = 1.21;
  land = 0.8;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
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
  startTime;
  endTime;
  startTimeout() {
    this.startTime = Date.now() / 1000;
    setInterval(() => {
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

  logTime() {
    return (
      this.timeInAir > this.endTime - this.startTime &&
      this.endTime - this.startTime > this.land
    );
  }

  // umschreiben
  isColliding(obj) {
    if (this.collects(obj)) {
      return this.collidingCollects(obj);
    } else {
      return this.collidingEnemy(obj);
    }
  }

  collects(obj) {
    return (
      obj.img.currentSrc.includes("coin") ||
      obj.img.currentSrc.includes("bottle")
    );
  }

  collidingEnemy(obj) {
    return (
      this.x - 20 + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y + 30 &&
      this.y + 130 <= obj.y + obj.height
    );
  }

  collidingCollects(obj) {
    return (
      this.x - 80 + this.width >= obj.x &&
      this.x + 80 <= obj.x + obj.width &&
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

  countBottle() {
    this.bottle += 1;
    return this.bottle;
  }
}
