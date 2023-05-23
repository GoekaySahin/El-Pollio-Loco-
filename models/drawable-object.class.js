class DrawableObject {
  x = 120;
  y = 160;
  height = 480;
  width = 100;
  imageCounter = 0;
  imageCache = {};
  img;

  /**
   * This function load the picture.
   * @param {link} to load from.
   */
  loadImage(path) {
    this.img = new Image(); // <--- abbildung eines img tags von html this.img = document.getELementById('image').
    this.img.src = path;
  }

  /**
   * This function takes a arry of links, to load the right picture.
   * @param {arry} with links.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // <-- bedeutet das ein neues Bild generiert wird.
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function is to draw the the pictures in the canvas.
   * @param {CanvasRenderingContext2D}.
   */

  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
    }
  }

  /**
   * This function is to draw the frame in the canvas.
   * @param {CanvasRenderingContext2D}.
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
