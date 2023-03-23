let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.group("My, Character is", world.character);
}

document.onkeydown = function (e) {
  console.log(e.key);
  if (e.key == "d") {
    console.log("right");
    keyboard.RIGHT = true;
  } else if (e.key == "a") {
    console.log("left");
    keyboard.LEFT = true;
  } else if (e.key == "s") {
    console.log("down");
    keyboard.DOWN = true;
  } else if (e.key == "w") {
    console.log("jump");
    keyboard.UP = true;
  }
};

document.onkeyup = function (e) {
  keyboard.RIGHT = false;
  keyboard.LEFT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
};
