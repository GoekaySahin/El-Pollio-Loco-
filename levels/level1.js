const level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Chicken()],
  [new Cloud(), new Cloud(), new Cloud()],
  [
    new Background("../img/5_background/layers/air.png", -719),
    new Background(`../img/5_background/layers/3_third_layer/1.png`, -719),
    new Background(`../img/5_background/layers/2_second_layer/1.png`, -719),
    new Background(`../img/5_background/layers/1_first_layer/1.png`, -719),

    new Background("../img/5_background/layers/air.png", 0),
    new Background(`../img/5_background/layers/3_third_layer/2.png`, 0),
    new Background(`../img/5_background/layers/2_second_layer/2.png`, 0),
    new Background(`../img/5_background/layers/1_first_layer/2.png`, 0),

    new Background("../img/5_background/layers/air.png", 719),
    new Background(`../img/5_background/layers/3_third_layer/1.png`, 719),
    new Background(`../img/5_background/layers/2_second_layer/1.png`, 719),
    new Background(`../img/5_background/layers/1_first_layer/1.png`, 719),

    new Background("../img/5_background/layers/air.png", 2 * 719),
    new Background(`../img/5_background/layers/3_third_layer/2.png`, 2 * 719),
    new Background(`../img/5_background/layers/2_second_layer/2.png`, 2 * 719),
    new Background(`../img/5_background/layers/1_first_layer/2.png`, 2 * 719),

    new Background("../img/5_background/layers/air.png", 3 * 719),
    new Background(`../img/5_background/layers/3_third_layer/1.png`, 3 * 719),
    new Background(`../img/5_background/layers/2_second_layer/1.png`, 3 * 719),
    new Background(`../img/5_background/layers/1_first_layer/1.png`, 3 * 719),
  ]
);
