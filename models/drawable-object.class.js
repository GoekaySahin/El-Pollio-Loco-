class DrawableObject {
  x = 120;
  y = 160;
  height = 480;
  width = 100;
  imageCounter = 0;
  imageCache = {};
  img;

  /**
   * This function is to set the right picture
   * @param {number} path index number for the IMAGES array
   */
  loadImage(path) {
    this.img = new Image(); // <--- abbildung eines img tags von html this.img = document.getELementById('image').
    this.img.src = path;
  }

  /**
   * This function is to set the right pictures for the animation
   * @param {array} arr paths to the right picture
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image(); // <-- bedeutet das ein neues Bild generiert wird.
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * This function is to load an 2d animation
   * @param {CanvasRenderingContext2D} ctx to load the 2d effekt
   */
  draw(ctx) {
    try {
      ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    } catch (e) {
      console.warn("Error loading image", e);
    }
  }

  /**
   * This function ti draw the animation in the canvas
   * @param {CanvasRenderingContext2D} ctx for the 2d animation
   */
  drawFrame(ctx) {
    ctx.beginPath();
    ctx.lineWidth = "6";
    ctx.strokeStyle = "red";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
  }
}
