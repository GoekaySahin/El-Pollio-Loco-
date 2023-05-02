let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkWidth();
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

function startGame() {
  if (!world.game_start) {
    let startScreen = document.getElementById("start");
    startScreen.classList.add("d-none");
    world.character.startCharacter();
    world.game_start = true;
  }
}

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

function checkWidth() {
  let message = document.getElementById("message");

  if (this.innerWidth < 480 || this.innerHeight < 720) {
    message.classList.remove("d-none");
  } else {
    message.classList.add("d-none");
  }
}
