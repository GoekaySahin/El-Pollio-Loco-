let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let menu = true;

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

function startGame() {
  let resControl = document.getElementById("respons_control");
  if (window.screen.width < 900) {
    resControl.classList.remove("d-none");
  } else {
    resControl.classList.add("d-none");
  }

  showSettings();

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
  toggleOptions();
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
function checkOrientation() {
  if (window.matchMedia("(orientation: landscape)").matches) {
    if (window.innerHeight < 480) {
      newHeight = window.innerHeight;
      document.getElementById("canvas").style.height = `${newHeight}px`;
    }
  } else {
    document.getElementById("canvas").style.height = `100%`;
  }
}

function checkWidth() {
  let message = document.getElementById("message");
  let info = document.getElementById("control");
  let device = document.getElementById("device");
  let rotatePhone = document.getElementById("landscape");
  let startScreen = document.getElementById("start");
  checkOrientation();

  /*   if (
    (this.screen.availWidth < 480 && this.screen.availHeight > 720) ||
    (this.screen.availWidth > 480 && this.screen.availHeight < 480) ||
    (this.screen.availWidth > 720 && this.screen.availHeight < 480) ||
    (this.screen.availWidth < 720 && this.screen.availHeight < 480) ||
    (this.screen.availWidth < 720 &&
      this.screen.availHeight > 480 &&
      this.screen.availHeight < 720)
  ) {
    message.classList.remove("d-none");
    device.style = "height:" + this.screen.availHeight * 2 + "px;";
  } else  */ if (
    this.screen.availWidth > this.screen.availHeight &&
    !rotatePhone.classList.value.includes("d-none")
  ) {
    rotatePhone.classList.add("d-none");
  } else if (
    this.screen.availWidth < this.screen.availHeight &&
    !startScreen.classList.value.includes("fullscreen-modus")
  ) {
    rotatePhone.classList.remove("d-none");
  }
  if (this.screen.availWidth <= 900) {
    info.classList.add("d-none");
  } else if (!startScreen.classList.value.includes("d-none")) {
    info.classList.remove("d-none");
  }
  if (this.screen.availWidth < 1441) {
    removeTitle();
  } else if (this.screen.availWidth > 1440) {
    addTitle();
  }
}

function toggleOptions() {
  let info = document.getElementById("information");
  let opt = document.getElementById("option");

  info.classList.toggle("d-none");
  opt.classList.add("correct-fullscreen-button");
}

function removeTitle() {
  let titleScreen = document.getElementById("title_screen");

  titleScreen.classList.add("d-none");
}
function addTitle() {
  let titleScreen = document.getElementById("title_screen");

  titleScreen.classList.remove("d-none");
}

document.addEventListener("DOMContentLoaded", () => {
  let right = document.getElementById("right");
  right.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.RIGHT = true;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let jump = document.getElementById("jump");
  jump.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.UP = true;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let left = document.getElementById("left");
  left.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let space = document.getElementById("throw");
  space.addEventListener("touchstart", (e) => {
    e.preventDefault();
    keyboard.SPACE = true;
    document.dispatchEvent(spaceKeyEvent);
    console.log("wo");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let right = document.getElementById("right");
  right.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.RIGHT = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let jump = document.getElementById("jump");
  jump.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.UP = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let left = document.getElementById("left");
  left.addEventListener("touchend", (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
  });
});
document.addEventListener("DOMContentLoaded", () => {
  let space = document.getElementById("throw");
  space.addEventListener("touchend", (e) => {
    e.preventDefault();
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
      winVisible();
      setTimeout(clearAllIntervals, 1100);
    }
  }, 100);
}

function winVisible() {
  let win = document.getElementById("win");
  let closeFull = document.getElementById("close_fullscreen");

  win.classList.remove("d-none");
  setTimeout(restartVisible, 600);

  if (!closeFull.classList.value.includes("d-none")) {
    win.classList.add("w100");
  } else if (
    closeFull.classList.value.includes("d-none") &&
    win.classList.value.includes("w100")
  ) {
    win.classList.remove("w100");
  }
}

function restartVisible() {
  let restart = document.getElementById("restart");
  restart.classList.remove("d-none");
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

function gameOverVisible() {
  let gameOverScreen = document.getElementById("game_over_screen");
  let gameOver = document.getElementById("game_over");
  let closeButton = document.getElementById("close_fullscreen");

  if (canvas.classList.value.includes("full")) {
    gameOverScreen.classList.add("w100h100");
    gameOver.classList.add("w100h100");
  }
  gameOverScreen.classList.remove("d-none");
  gameOver.classList.remove("d-none");
  restartVisible();

  if (!closeButton.classList.value.includes("d-none")) {
    gameOver.classList.remove("startscreen-img");
  }
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

function switchScreenButton() {
  let fullscreen = document.getElementById("open_fullscreen");
  let closeFullscreen = document.getElementById("close_fullscreen");

  fullscreen.classList.toggle("d-none");
  closeFullscreen.classList.toggle("d-none");
}

function openFullscreen() {
  let content = document.getElementById("content");

  enterFullscreen(content);
  screenMaxWidth();
  switchScreenButton();
}

function screenMaxWidth() {
  let screen = document.getElementById("canvas");
  let screenImg = document.getElementById("start");

  screen.classList.add("fullscreen-modus");
  screenImg.classList.add("fullscreen-modus");
}
function screenMaxWidthClose() {
  let screen = document.getElementById("canvas");
  let screenImg = document.getElementById("start");

  screen.classList.remove("fullscreen-modus");
  screenImg.classList.remove("fullscreen-modus");
}

function closeFullscreen() {
  let content = document.getElementById("content");

  exitFullscreen(content);
  screenMaxWidthClose();
  switchScreenButton();
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    // for IE11 (remove June 15, 2022)
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    // iOS Safari
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function startAnimation() {
  let setting = document.getElementById("setting");

  if (menu && !setting.classList.value.includes("h140")) {
    menuFalse();

    if (setting.classList.value.includes("close")) {
      setting.classList.remove("setting-animation-close");
    }
    if (!setting.classList.value.includes("h140")) {
      setting.classList.add("setting-animation");
      setTimeout(settingHeight, 1300);
      optionButtonsVisible();
    }
    setTimeout(menuTrue, 1300);
  }
}

function optionButtonsVisible() {
  if (canvas.classList.value.includes("fullscreen")) {
    setTimeout(fullscreenCloseVisible, 150);
    setTimeout(controllerVisible, 350);
    setTimeout(soundVisible, 550);
  } else {
    setTimeout(fullscreenVisible, 150);
    setTimeout(controllerVisible, 350);
    setTimeout(soundVisible, 550);
  }
}

function optionButtonsInvisible() {
  if (canvas.classList.value.includes("fullscreen")) {
    setTimeout(fullscreenCloseVisible, 150);
    setTimeout(controllerInvisible, 350);
    setTimeout(soundInvisible, 550);
  } else {
    setTimeout(fullscreenInvisible, 150);
    setTimeout(controllerInvisible, 350);
    setTimeout(soundInvisible, 550);
  }
}

function fullscreenCloseVisible() {
  let fullscreenClose = document.getElementById("close_fullscreen");
  fullscreenClose.classList.toggle("d-none");
}

function fullscreenVisible() {
  let fullscreen = document.getElementById("open_fullscreen");
  fullscreen.classList.toggle("d-none");
}
function fullscreenInvisible() {
  let fullscreen = document.getElementById("open_fullscreen");
  fullscreen.classList.add("d-none");
}

function controllerVisible() {
  let controller = document.getElementById("controller");
  controller.classList.toggle("d-none");
}

function controllerInvisible() {
  let controller = document.getElementById("controller");
  controller.classList.add("d-none");
}

function soundVisible() {
  let sound = document.getElementById("sound");
  sound.classList.toggle("d-none");
}

function soundInvisible() {
  let sound = document.getElementById("sound");
  sound.classList.add("d-none");
}

function settingHeight() {
  let setting = document.getElementById("setting");

  setting.classList.add("h140");
}

function showSettings() {
  let setting = document.getElementById("setting");
  setting.classList.remove("d-none");
}

function closeSettings() {
  let setting = document.getElementById("setting");

  if (menu && setting.classList.value.includes("h140")) {
    menuFalse();
    if (setting.classList.value.includes("h140")) {
      setting.classList.remove("setting-animation");

      setting.classList.add("setting-animation-close");
      removeSettingH140();
      optionButtonsInvisible();
    }
    setTimeout(menuTrue, 1300);
  }
}

function removeSettingH140() {
  let setting = document.getElementById("setting");
  setting.classList.remove("h140");
}

function menuTrue() {
  menu = true;
}

function menuFalse() {
  menu = false;
}
