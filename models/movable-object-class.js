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
    let i = this.imageCounter % images.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren
    let path = images[i];
    this.img = this.imageCache[path];
    this.imageCounter++;
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
      1.21 > this.endTime - this.startTime &&
      this.endTime - this.startTime > 0.8
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
