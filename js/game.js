let canvas;
let ctx;
let world;
let keyboard = new Keyboard();

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkWidth();
  gameOver();
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
  } else if (e.key == "d" && e.key == "w") {
    keyboard.UP = true;
    keyboard.RIGHT = true;
  }
};

function responsWalkLeft() {
  keyboard.LEFT = true;
}

function responsWalkRight() {
  keyboard.RIGHT = true;
}

function responsJump() {
  keyboard.UP = true;
}

function responsThrow() {
  keyboard.SPACE = true;
}

function responsWalkLeftFalse() {
  keyboard.LEFT = false;
}

function responsWalkRightFalse() {
  keyboard.RIGHT = false;
}

function responsJumpFalse() {
  keyboard.UP = false;
}

function responsThrowFalse() {
  keyboard.SPACE = false;
}

function startGame() {
  let resControl = document.getElementById("respons_control");
  let resInfo = document.getElementById("control_info_respons");
  if (this.innerWidth < 900) {
    resControl.classList.remove("d-none");
    resInfo.classList.add("d-none");
  } else {
    resControl.classList.add("d-none");
  }

  if (!world.game_start) {
    let startScreen = document.getElementById("start");
    let btn = document.getElementById("start_btn");
    let control = document.getElementById("control");

    control.classList.add("d-none");
    btn.classList.add("d-none");
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
  if (e.key == "a") {
    keyboard.LEFT = false;
  } else if (e.key == "d") {
    keyboard.RIGHT = false;
  } else if (e.key == "w") {
    keyboard.UP = false;
  } else if (e.key == "Space") {
    keyboard.SPACE = false;
  }
};

function checkWidth() {
  let message = document.getElementById("message");
  let responsInfo = document.getElementById("control_info_respons");
  let info = document.getElementById("control");

  if (this.innerWidth < 480 || this.innerHeight < 720) {
    message.classList.remove("d-none");
  }
  if (this.innerWidth < 900) {
    responsInfo.classList.remove("d-none");
    info.classList.add("d-none");
  } else {
    responsInfo.classList.add("d-none");
    info.classList.remove("d-none");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const right = document.getElementById("right");
  right.addEventListener("touchstart", () => {
    keyboard.RIGHT = true;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const up = document.getElementById("up");
  up.addEventListener("touchstart", () => {
    keyboard.UP = true;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const left = document.getElementById("left");
  left.addEventListener("touchstart", () => {
    keyboard.LEFT = true;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const space = document.getElementById("throw");
  space.addEventListener("touchstart", () => {
    keyboard.SPACE = true;
    document.dispatchEvent(spaceKeyEvent);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const right = document.getElementById("right");
  right.addEventListener("touchend", () => {
    keyboard.RIGHT = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const up = document.getElementById("up");
  up.addEventListener("touchend", () => {
    keyboard.UP = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const left = document.getElementById("left");
  left.addEventListener("touchend", () => {
    keyboard.LEFT = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const space = document.getElementById("throw");
  space.addEventListener("touchend", () => {
    keyboard.SPACE = false;
  });
});

function gameOver() {
  setInterval(() => {
    let endboss_index = world.level.enemies.length - 1;
    if (world.character.power == 0) {
      setTimeout(gameOverVisible, 400);
      setTimeout(clearAllIntervals, 450);
    } else if (world.level.enemies[endboss_index].power == 0) {
      world.character.loadImage("img/2_character_pepe/2_walk/W-21.png");
      let win = document.getElementById("win");
      win.classList.remove("d-none");
      setTimeout(clearAllIntervals, 1100);
    }
  }, 100);
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function gameOverVisible() {
  let GameOverScreen = document.getElementById("game_over");
  GameOverScreen.classList.remove("d-none");
}

function stopWalkingSound() {
  world.character.walking_sound.pause();
}

function moveRight(x) {
  if (x.power == undefined || x.power > 0) {
    x.x += x.speed;
  }
}
const spaceKeyEvent = new KeyboardEvent("keydown", {
  code: "Space",
  key: " ",
  charCode: 32,
  keyCode: 32,
  which: 32,
});

function turnLeft(x) {
  x.otherDirection = true;
}
