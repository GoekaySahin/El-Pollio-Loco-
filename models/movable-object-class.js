class MovableObject {
  x = 120;
  speed = 0.15;
  img;
  height = 480;
  width = 100;
  imageCache = {};
  otherDirection = false;
  imageCounter = 0;
  speedY = 0;
  acceleration = 2;
  y = 160;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 180;
  }

  loadImage(path) {
    this.img = new Image(); // <--- abbildung eines img tags von html this.img = document.getELementById('image')
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // <-- bedeutet das ein neues Bild generiert wird
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  moveRight() {
    this.x += this.speed;
    this.otherDirection = false;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let i = this.imageCounter % this.IMAGES_WALKING.length; // anstatt einer schleife wird hier der Modulu verwendet um stetig bilder zu generieren
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

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }

  // umschreiben
  isColliding(obj) {
    return (
      this.x + this.width >= obj.x &&
      this.x <= obj.x + obj.width &&
      this.y + this.offsetY + this.height >= obj.y &&
      this.y + this.offsetY <= obj.y + obj.height &&
      obj.onCollisionCourse
    );
    // Optional: hiermit könnten wir schauen, ob ein Objekt sich in die richtige Richtung bewegt. Nur dann kollidieren wir. Nützlich bei Gegenständen, auf denen man stehen kann.
  }
}
