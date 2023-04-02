let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.group("My, Character is", world.character);
}

let downTime = true;

document.onkeydown = function (e) {
  if (e.key == "d") {
    keyboard.RIGHT = true;
  } else if (e.key == "a") {
    keyboard.LEFT = true;
  } else if (e.key == "s") {
    keyboard.DOWN = true;
  } else if (e.key == "w") {
    keyboard.UP = true;
  } else if (e.code == "Space" && downTime) {
    keyboard.SPACE = true;
    setTimeout(setFalse, 40);
  }
};

function setFalse() {
  keyboard.SPACE = false;
  downTime = false;
  setTimeout(setTrue, 350);
}

function setTrue() {
  downTime = true;
}

document.onkeyup = function (e) {
  keyboard.RIGHT = false;
  keyboard.LEFT = false;
  keyboard.UP = false;
  keyboard.DOWN = false;
  keyboard.SPACE = false;
};
