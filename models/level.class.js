class Level {
  enemies;
  cloud;
  background;
  collectable;
  collectableBottle;
  level_end = 4400;

  constructor(enemies, clouds, background, collectable, collectableBottle) {
    this.initLevel(enemies, clouds, background, collectable, collectableBottle);
  }

  /**
   *  This function is to set the level
   * @param {object} enemies of the element
   * @param {object} clouds of the element
   * @param {object} background of the element
   * @param {object} collectable of the element
   * @param {object} collectableBottle of the element
   */
  initLevel(enemies, clouds, background, collectable, collectableBottle) {
    this.enemies = enemies;
    this.cloud = clouds;
    this.background = background;
    this.collectable = collectable;
    this.collectableBottle = collectableBottle;
  }
}
