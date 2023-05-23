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
   * This function is to set the level.
   * @param {object}
   */
  initLevel(enemies, clouds, background, collectable, collectableBottle) {
    this.enemies = enemies;
    this.cloud = clouds;
    this.background = background;
    this.collectable = collectable;
    this.collectableBottle = collectableBottle;
  }
}
