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
  }

  // umschreiben
  isColliding(obj) {
    return (
      this.x + (this.width - 30) >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y <= obj.y + obj.height
      //obj.onCollisionCourse
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
