class MovableObject {
  x = 120;
  speed = 0.15;

  img;
  heigth = canvas.height;
  width = 100;
  imageCache = {};
  otherDirection = false;

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
    setInterval(() => {
      this.x += this.speed;
    }, 1000 / 60);
  }

  moveLeft() {
    setInterval(() => {
      this.x -= this.speed;
    }, 1000 / 60);
  }
}
