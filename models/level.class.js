class Level {
  enemies;
  cloud;
  background;
  collectable;
  collectableBottle;
  level_end = 4314;

  constructor(enemies, clouds, background, collectable, collectableBottle) {
    this.enemies = enemies;
    this.cloud = clouds;
    this.background = background;
    this.collectable = collectable;
    this.collectableBottle = collectableBottle;
  }
}
