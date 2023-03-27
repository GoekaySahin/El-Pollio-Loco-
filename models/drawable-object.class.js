class DrawableObject {
  x = 120;
  y = 160;
  height = 480;
  width = 100;
  imageCounter = 0;
  imageCache = {};
  img;

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

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
    }
  }

  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
