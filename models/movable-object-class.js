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

  /**
   * This function is to check if characte is on a jump, and if so to activate gravity.
   */
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

  /**
   * This function is to check if character is over ground.
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 180;
    }
  }

  /**
   * This function is to move the objcet to right.
   * @param {pbjcet}.
   */
  moveRight(x) {
    if (x.power > 0) {
      x.x += this.speed;
      x.otherDirection = false;
    }
  }

  /**
   * This function is to move the objcet to left.
   * @param {object}.
   */
  moveLeft(x) {
    if (x.power == undefined || x.power > 0) {
      x.x -= this.speed;
    }
  }

  /**
   * This function is to play animation of the right picture of the.
   * @param {array, object}.
   */
  playAnimation(images, x) {
    if (this.imageCounter == undefined) {
      let i = x.imageCounter % images.length;
      let path = images[i];
      x.img = x.imageCache[path];
      x.imageCounter++;
    } else {
      let i = this.imageCounter % images.length;
      let path = images[i];
      this.img = this.imageCache[path];
      this.imageCounter++;
    }
  }

  /**
   * This function is to play the kill animation on the.
   * @param {object}.
   */
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

  /**
   * This function makes the obj invisible, let it impode.
   * @param {object}.
   */
  enemyImplode(obj) {
    obj.x = 0;
    obj.y = 0;
    obj.width = 0;
    obj.height = 0;
  }

  /**
   * This function is to turn character in other direction.
   */
  turnLeft() {
    this.otherDirection = true;
  }

  /**
   * This function is to speed up the movement to the air.
   */
  jump() {
    this.speedY = 30;
    this.startTimeout();
  }

  /**
   * This function is to make a small jump if jump on enemy.
   */
  smalJump() {
    this.speedY = 20;
    this.standTimer();
  }

  /**
   * This function is to check the time when character is flying down on enemy to make a good reaction.
   */
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

  /**
   * This function resets the variable.
   */
  clearTime() {
    this.endTime = 0;
    this.startTime = 0;
  }

  /**
   * This function is to check time.
   */
  endTimeout() {
    this.endTime = Date.now() / 1000;
    this.logTime();
  }

  /**
   * This function is to set the postion of character back to startpoint if character alive.
   */
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

  /**
   * This function is to reset the position after a jump.
   */
  tarePos() {
    if (this.power > 0) {
      this.pos = this.y;
    }
  }

  /**
   * This function is check flytime.
   */
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

  /**
   * This function if collision is happening and check with what is collinding.
   * @param {object, object}
   */
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

  /**
   * This function returns if objcet is a colletable.
   */
  collects(obj) {
    if (!(obj.src == undefined) && obj.img.src.includes("Collectable")) {
      return (
        obj.img.currentSrc.includes("coin") ||
        obj.img.currentSrc.includes("bottle")
      );
    }
  }

  /**
   * This function return if a collision with enemy and character is happening.
   * @param {object}.
   */
  collidingEnemy(obj) {
    return (
      obj.power > 0 &&
      this.x + this.width - this.offset.right >= obj.x + obj.offset.left && // Rechts zu Links
      this.x + this.offset.left <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      this.y + this.height - this.offset.bottom >= obj.y + obj.offset.top && // Top zu Bottom
      this.y + this.offset.top <= obj.y + obj.height - this.offset.bottom // Bottom zu Top
    );
  }

  /**
   * This function returning if colliding with enemy and bottle is happening.
   * @param {object, object}.
   */
  collidingEnemyBottle(obj, bottle) {
    return (
      bottle.x + bottle.width >= obj.x + obj.offset.left && // Rechts zu Links
      bottle.x <= obj.x + obj.width - obj.offset.right && // Links zu Rechts
      bottle.y + bottle.height >= obj.y + obj.offset.top && // Top zu Bottom
      bottle.y <= obj.y + obj.height // Bottom zu Top
    );
  }

  /**
   * This function is set the range to colliding with colletable.
   * @param {object}.
   */
  collidingCollects(obj) {
    return (
      this.x - 80 + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.height >= obj.y &&
      this.y + 130 <= obj.y + obj.height
    );
  }

  /**
   * This function is to check if hit and reduce power.
   */
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

  /**
   * This function checks if is hurt means if he gets hurt, characte has 1 sec time wich he cant get hurt a second time.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * This function is returns hurtime.
   */
  hurtTime() {
    return !this.isHurt();
  }

  /**
   * This function checks if power of the object is dead.
   */
  isDead() {
    return this.power == 0;
  }

  /**
   * This function is to prevent that character cant collect more than 5 coins.
   */
  getCoin() {
    if (this.coins > 5 || this.coins == 5) {
      return 5;
    }
    this.coins += 1;
    return this.coins;
  }

  /**
   * This function check how enemy gets hit.
   * @param {object, object} enemy and bottle.
   */
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

  /**
   * This function prevents character to get more than 5 bottles.
   */
  countBottle() {
    if (this.bottle > 5 || this.bottle == 5) {
      return 5;
    }
    this.bottle += 1;
    return this.bottle;
  }

  /*   stopInter(inter) {
    clearInterval(inter);
  } */

  /**
   * This function is plays the sound of the object.
   * @param {object}
   */
  playAudio(obj) {
    if (this.sound) {
      obj.play();
    }
  }
}
