let level2;

/**
 * This function is used to generate the hole level.
 *
 * @param {object} class wich will creat in the level in the canvas.
 */
const level1 = new Level(
  [
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Chicken(),
    new Endboss(),
  ],

  [new Cloud(), new Cloud(), new Cloud()],
  [
    new Background("img/5_background/layers/air.png", -719),
    new Background(`img/5_background/layers/3_third_layer/1.png`, -719),
    new Background(`img/5_background/layers/2_second_layer/1.png`, -719),
    new Background(`img/5_background/layers/1_first_layer/1.png`, -719),

    new Background("img/5_background/layers/air.png", 0),
    new Background(`img/5_background/layers/3_third_layer/2.png`, 0),
    new Background(`img/5_background/layers/2_second_layer/2.png`, 0),
    new Background(`img/5_background/layers/1_first_layer/2.png`, 0),

    new Background("img/5_background/layers/air.png", 719),
    new Background(`img/5_background/layers/3_third_layer/1.png`, 719),
    new Background("img/5_background/layers/2_second_layer/1.png", 719),
    new Background(`img/5_background/layers/1_first_layer/1.png`, 719),

    new Background("img/5_background/layers/air.png", 2 * 719),
    new Background(`img/5_background/layers/3_third_layer/2.png`, 2 * 719),
    new Background(`img/5_background/layers/2_second_layer/2.png`, 2 * 719),
    new Background(`img/5_background/layers/1_first_layer/2.png`, 2 * 719),

    new Background("img/5_background/layers/air.png", 3 * 719),
    new Background(`img/5_background/layers/3_third_layer/1.png`, 3 * 719),
    new Background(`img/5_background/layers/2_second_layer/1.png`, 3 * 719),
    new Background(`img/5_background/layers/1_first_layer/1.png`, 3 * 719),

    new Background("img/5_background/layers/air.png", 4 * 719),
    new Background(`img/5_background/layers/3_third_layer/2.png`, 4 * 719),
    new Background(`img/5_background/layers/2_second_layer/2.png`, 4 * 719),
    new Background(`img/5_background/layers/1_first_layer/2.png`, 4 * 719),

    new Background("img/5_background/layers/air.png", 5 * 719),
    new Background(`img/5_background/layers/3_third_layer/1.png`, 5 * 719),
    new Background(`img/5_background/layers/2_second_layer/1.png`, 5 * 719),
    new Background(`img/5_background/layers/1_first_layer/1.png`, 5 * 719),

    new Background("img/5_background/layers/air.png", 6 * 719),
    new Background(`img/5_background/layers/3_third_layer/2.png`, 6 * 719),
    new Background(`img/5_background/layers/2_second_layer/2.png`, 6 * 719),
    new Background(`img/5_background/layers/1_first_layer/2.png`, 6 * 719),
  ],
  [
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
    new Collectable("img/8_coin/coin_2.png"),
  ],
  [
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
  ]
);

/**
 * This function is used to generate the level, when click on restart.
 * @param {object} class wich will creat the level2 in the canvas.
 *
 */
function creatNewLevel() {
  level2 = new Level(
    [
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new Chicken(),
      new Chicken(),
      new SmallChicken(),
      new SmallChicken(),
      new SmallChicken(),
      new Chicken(),
      new Endboss(),
    ],

    [new Cloud(), new Cloud(), new Cloud()],
    [
      new Background("img/5_background/layers/air.png", -719),
      new Background(`img/5_background/layers/3_third_layer/1.png`, -719),
      new Background(`img/5_background/layers/2_second_layer/1.png`, -719),
      new Background(`img/5_background/layers/1_first_layer/1.png`, -719),

      new Background("img/5_background/layers/air.png", 0),
      new Background(`img/5_background/layers/3_third_layer/2.png`, 0),
      new Background(`img/5_background/layers/2_second_layer/2.png`, 0),
      new Background(`img/5_background/layers/1_first_layer/2.png`, 0),

      new Background("img/5_background/layers/air.png", 719),
      new Background(`img/5_background/layers/3_third_layer/1.png`, 719),
      new Background("img/5_background/layers/2_second_layer/1.png", 719),
      new Background(`img/5_background/layers/1_first_layer/1.png`, 719),

      new Background("img/5_background/layers/air.png", 2 * 719),
      new Background(`img/5_background/layers/3_third_layer/2.png`, 2 * 719),
      new Background(`img/5_background/layers/2_second_layer/2.png`, 2 * 719),
      new Background(`img/5_background/layers/1_first_layer/2.png`, 2 * 719),

      new Background("img/5_background/layers/air.png", 3 * 719),
      new Background(`img/5_background/layers/3_third_layer/1.png`, 3 * 719),
      new Background(`img/5_background/layers/2_second_layer/1.png`, 3 * 719),
      new Background(`img/5_background/layers/1_first_layer/1.png`, 3 * 719),

      new Background("img/5_background/layers/air.png", 4 * 719),
      new Background(`img/5_background/layers/3_third_layer/2.png`, 4 * 719),
      new Background(`img/5_background/layers/2_second_layer/2.png`, 4 * 719),
      new Background(`img/5_background/layers/1_first_layer/2.png`, 4 * 719),

      new Background("img/5_background/layers/air.png", 5 * 719),
      new Background(`img/5_background/layers/3_third_layer/1.png`, 5 * 719),
      new Background(`img/5_background/layers/2_second_layer/1.png`, 5 * 719),
      new Background(`img/5_background/layers/1_first_layer/1.png`, 5 * 719),

      new Background("img/5_background/layers/air.png", 6 * 719),
      new Background(`img/5_background/layers/3_third_layer/2.png`, 6 * 719),
      new Background(`img/5_background/layers/2_second_layer/2.png`, 6 * 719),
      new Background(`img/5_background/layers/1_first_layer/2.png`, 6 * 719),
    ],
    [
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
      new Collectable("img/8_coin/coin_2.png"),
    ],
    [
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
      new CollectableBottle("img/6_salsa_bottle/1_salsa_bottle_on_ground.png"),
    ]
  );
}
