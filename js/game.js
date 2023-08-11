let canvas;
let ctx;
let world;
let keyboard = new Keyboard();
let menu = true;
let downTime = true;

// INITS

let chickenInit;
let smallChickenInit;
let endbossInit;

let chickens;
let smallChickens;
let endbosses;

let levelNew;

// INITS END

let enemies;
let clouds;
let background;
let collectable;
let collectableBottle;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  checkWidth();
  gameOver();
  getInitsEnemy();
}

/**
 *
 * This function is to reset the level and enemies.
 */
function setLevel() {
  creatNewLevel();
  world.level = level2;
}

/**
 *
 * This function is to set the right var to true if onkeydown.
 * @param {event object}
 * */
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

/**
 *
 * This function is to show the control buttons for responsive.
 * @param {object}
 */
function showResponsControl(resControl) {
  resControl.classList.remove("d-none");
}

/**
 *
 * This function is to hide the control buttons for responsive.
 * @param {object}
 */
function hideResponsControl(resControl) {
  resControl.classList.add("d-none");
}

/**
 *
 * This function is to remove the start screen and show the settings.
 */
function startGame() {
  let resControl = document.getElementById("respons_control");

  if (window.screen.width < 900) {
    showResponsControl(resControl);
  } else {
    hideResponsControl(resControl);
  }
  showSettings();
  if (gameStart()) {
    setGame();
  }
}

/**
 *
 * This function call back the boolen of the variable.
 */
function gameStart() {
  /* if (world.game_start == undefined) {
    location.reload();
  } */
  return !world.game_start;
}

/**
 *
 * This function set the screen for the playing part.
 */
function setGame() {
  let startScreen = document.getElementById("start");
  let btn = document.getElementById("start_btn");
  let control = document.getElementById("control");

  control.classList.add("d-none");
  btn.classList.add("d-none");
  startScreen.classList.add("d-none");
  world.character.startCharacter();

  world.game_start = true;
}

/**
 *
 *  This function is to set set the boolens for the bottle drop.
 */
function setFalse() {
  keyboard.SPACE = false;
  downTime = false;
  setTimeout(setTrue, 350);
}

function setTrue() {
  downTime = true;
}

/**
 *
 *  This function is to set set the keyboard connected var's back to false if keyup.
 */
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

/**
 *
 *  This function is to set check teh viewport.
 */
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

/**
 *
 *  This function is to check the viewport and and make the settings fot it.
 */
function checkWidth() {
  let info = document.getElementById("control");
  let rotatePhone = document.getElementById("landscape");
  let startScreen = document.getElementById("start");
  checkOrientation();

  if (widthBiggerThanHeigth(rotatePhone)) {
    rotatePhoneInvisible(rotatePhone);
  } else if (widthSmallerThanHeight(startScreen)) {
    rotatePhoneVisible(rotatePhone);
  }
  if (this.screen.availWidth <= 900) {
    controlInvisible(info);
  } else if (startscreenVisible(startScreen)) {
    controlVisible(info);
  }
  if (this.screen.availWidth < 1441) {
    removeTitle();
  } else if (this.screen.availWidth > 1440) {
    addTitle();
  }

  checkOrientationLast(rotatePhone);
}

function checkOrientationLast(rotatePhone) {
  let canvas = document.getElementById("canvas");
  let start = document.getElementById("start");
  if (window.innerWidth < 1024) {
    if (window.orientation == 90) {
      rotatePhone.classList.add("d-none");
      /*     canvas.width = window.innerWidth;
    start.width = window.innerWidth;
    canvas.height = window.innerHeight;
    start.height = window.innerHeight; */
    } else {
      rotatePhone.classList.remove("d-none");
    }
  }
}

/**
 *
 *  This function is returns the status of the start screen.
 * @param {object} of startscreen
 */
function startscreenVisible(startScreen) {
  return !startScreen.classList.value.includes("d-none");
}

/**
 *
 *  This function remove the d-none for control.
 * @param {object}
 */
function controlVisible(info) {
  info.classList.remove("d-none");
}

/**
 *
 *  This function add the d-none for control.
 * @param {object}
 */
function controlInvisible(info) {
  info.classList.add("d-none");
}

/**
 *
 *  This function returns if width is smaller than the height.
 */
function widthSmallerThanHeight(startScreen) {
  return (
    window.screen.availWidth < window.screen.availHeight &&
    !startScreen.classList.value.includes("fullscreen-modus")
  );
}

/**
 *
 *  This function returns if height is bigger than width.
 */
function widthBiggerThanHeigth(rotatePhone) {
  return (
    window.screen.availWidth > window.screen.availHeight &&
    !rotatePhone.classList.value.includes("d-none")
  );
}

/**
 *
 *  This function rmeoves d-none to a picture (rotate-phone).
 * @param {object} id of img.
 *
 */
function rotatePhoneVisible(rotatePhone) {
  rotatePhone.classList.remove("d-none");
  contentFit();
}

function rotatePhoneInvisible(rotatePhone) {
  rotatePhone.classList.add("d-none");
  contentFitRemove();
}

/**
 *
 *  This function add width: 100vh to fill the screen.
 */
function contentFit() {
  let content = document.getElementById("content");
  content.classList.add("only-w100");
}

/**
 *
 *  This function remove the width: 100vh;.
 */
function contentFitRemove() {
  let content = document.getElementById("content");
  content.classList.remove("only-w100");
}

/**
 *  This function is to add d-none to the title screen.
 */
function removeTitle() {
  let titleScreen = document.getElementById("title_screen");

  titleScreen.classList.add("d-none");
}

function addTitle() {
  let titleScreen = document.getElementById("title_screen");

  titleScreen.classList.remove("d-none");
}

/**
 *  This function is to set the configuration for the responsicve buttons.
 */
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

/**
 *  This function checks how the game ends and shows the right screen end sound after that.
 */
function gameOver() {
  setInterval(() => {
    let endboss_index = world.level.enemies.length - 1;
    if (world.character.power == 0) {
      setTimeout(gameOverVisible, 400);
      setTimeout(clearAllIntervals, 420);
    } else if (world.level.enemies[endboss_index].power == 0) {
      world.character.loadImage("img/2_character_pepe/2_walk/W-21.png");
      winVisible();
      setTimeout(clearAllIntervals, 1100);
    }
  }, 100);
}

/**
 *
 *  This function show the win screen and start the restart screen as well.
 */
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

/**
 * This function is to stop all intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    window.clearInterval(i);
  }
}

/**
 * This function shows the game over screen.
 */
function gameOverVisible() {
  let gameOverScreen = document.getElementById("game_over_screen");
  let gameOver = document.getElementById("game_over");
  let closeButton = document.getElementById("close_fullscreen");

  checkGameOverSize(gameOverScreen, gameOver);
  gameOverScreen.classList.remove("d-none");
  gameOver.classList.remove("d-none");
  restartVisible();

  if (!closeButton.classList.value.includes("d-none")) {
    gameOver.classList.remove("startscreen-img");
  }
}

/**
 * This function checks the width for the game over screen.
 */
function checkGameOverSize(gameOverScreen, gameOver) {
  if (canvas.classList.value.includes("full")) {
    gameOverScreen.classList.add("w100h100");
    gameOver.classList.add("w100h100");
  } else {
    gameOverScreen.classList.remove("w100h100");
    gameOver.classList.remove("w100h100");
  }
}

/**
 * This function is to add to the x axis (walk).
 * @param {class}
 */
function moveRight(x) {
  if (x.power == undefined || x.power > 0) {
    x.x += x.speed;
  }
}

/**
 * This function is to touch space with code.
 */
const spaceKeyEvent = new KeyboardEvent("keydown", {
  code: "Space",
  key: " ",
  charCode: 32,
  keyCode: 32,
  which: 32,
});

/**
 * This function turn the character to left.
 * @param {class}
 */
function turnLeft(x) {
  x.otherDirection = true;
}

/**
 * This function swtich beetwen open and close fullscreen.
 */
function switchScreenButton() {
  let fullscreen = document.getElementById("open_fullscreen");
  let closeFullscreen = document.getElementById("close_fullscreen");

  fullscreen.classList.toggle("d-none");
  closeFullscreen.classList.toggle("d-none");
}

/**
 * This function is to open the fullscreen.
 */
function openFullscreen() {
  let content = document.getElementById("content");

  enterFullscreen(content);
  screenMaxWidth();
  switchScreenButton();
}

/**
 * This function to add fullscreen on canvas.
 */
function screenMaxWidth() {
  let screen = document.getElementById("canvas");
  let screenImg = document.getElementById("start");

  screen.classList.add("fullscreen-modus");
  screenImg.classList.add("fullscreen-modus");
}

/**
 * This function is to close the fullscreen on canvas.
 */
function screenMaxWidthClose() {
  let screen = document.getElementById("canvas");
  let screenImg = document.getElementById("start");

  screen.classList.remove("fullscreen-modus");
  screenImg.classList.remove("fullscreen-modus");
}

/**
 * This function is to close the fullscreen modus.
 */
function closeFullscreen() {
  let content = document.getElementById("content");

  exitFullscreen(content);
  screenMaxWidthClose();
  switchScreenButton();
}

/**
 * This function sets the fullscreen.
 */
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

/**
 * This function extio fullscreen on opera.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * This function to enable sound.
 */
function soundOn() {
  let sound = world.character.sound;
  return sound;
}

/**
 * This function show or hide the mute icon or the sound icon.
 */
function soundIconInvisible() {
  let sound = document.getElementById("sound");
  let mute = document.getElementById("mute");

  sound.classList.add("d-none");
  mute.classList.remove("d-none");
}

/**
 * This function is to start the animation of the options (top right).
 */
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

/**
 * This function is to show the icons d-none in a certain order.
 */
function optionButtonsVisible() {
  if (canvas.classList.value.includes("fullscreen")) {
    setTimeout(soundVisible, 200);
    setTimeout(controllerVisible, 450);
    setTimeout(fullscreenCloseVisible, 650);
  } else {
    setTimeout(soundVisible, 200);
    setTimeout(controllerVisible, 450);
    setTimeout(fullscreenVisible, 650);
  }
}

/**
 * This function is to hide the icons d-none in a certain order.
 */
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

/**
 * This function makes the icon close fullscreen visible.
 */
function fullscreenCloseVisible() {
  let fullscreenClose = document.getElementById("close_fullscreen");
  fullscreenClose.classList.toggle("d-none");
}

/**
 * This function makes the icon fullscreen visible.
 */
function fullscreenVisible() {
  let fullscreen = document.getElementById("open_fullscreen");
  fullscreen.classList.toggle("d-none");
}

/**
 * This function makes the icon fullscreen invisible.
 */
function fullscreenInvisible() {
  let fullscreen = document.getElementById("open_fullscreen");
  fullscreen.classList.add("d-none");
}

/**
 * This function shows the control.
 */
function controllerVisible() {
  let controller = document.getElementById("controller");
  controller.classList.toggle("d-none");
}

/**
 * This function hides the control.
 */
function controllerInvisible() {
  let controller = document.getElementById("controller");
  controller.classList.add("d-none");
}

/**
 * This function shows the sound icon.
 */
function soundVisible() {
  let sound = document.getElementById("sound");
  let mute = document.getElementById("mute");

  if (soundOn()) {
    sound.classList.remove("d-none");
  } else if (!soundOn()) {
    mute.classList.remove("d-none");
  }
}

/**
 * This function hides the sound icon.
 */
function soundInvisible() {
  let sound = document.getElementById("sound");
  sound.classList.add("d-none");
  muteIconInvisible();
}

/**
 * This function add the height on the animation to open the menu bar.
 */
function settingHeight() {
  let setting = document.getElementById("setting");
  setting.classList.add("h140");
}

/**
 * This function remove the d-none to show the settings.
 */
function showSettings() {
  let setting = document.getElementById("setting");
  setting.classList.remove("d-none");
}

/**
 * This function add d-none to make the mute icon invisible.
 */
function muteIconInvisible() {
  let mute = document.getElementById("mute");
  mute.classList.add("d-none");
}

/**
 * This function is to start the closing animation for the setting bar.
 */
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

/**
 * This function to remove the height, to close the animation/setting bar.
 */
function removeSettingH140() {
  let setting = document.getElementById("setting");
  setting.classList.remove("h140");
}

/**
 * This function set the variable to true.
 */
function menuTrue() {
  menu = true;
}

/**
 * This function set the varibale to false.
 */
function menuFalse() {
  menu = false;
}

// Mute function

/**
 * This function start the mute.
 */
function mute() {
  toggleSoundIcons();
  world.character.sound = false;
  chickenMute();
  bottleMute();
}

/**
 * This function turn the mute off.
 */
function muteOff() {
  toggleSoundIcons();
  world.character.sound = true;
}

/**
 * This function toggle the sound icons from sound to mute or other ways.
 */
function toggleSoundIcons() {
  muteIconToggle();
  soundIconToggle();
}

/**
 * This function toggles the mute icon d-none.
 */
function muteIconToggle() {
  let muteIcon = document.getElementById("mute");
  muteIcon.classList.toggle("d-none");
}

/**
 * This function toggles the sound icon d-none.
 */
function soundIconToggle() {
  let soundIcon = document.getElementById("sound");
  soundIcon.classList.toggle("d-none");
}

/**
 * This function set the chicken sound on mute.
 */
function chickenMute() {
  world.level.enemies.forEach((enemy) => {
    enemy.sound = false;
  });
}

/**
 * This function turns the chicken sound back on.
 */
function chickenMuteOff() {
  world.level.enemies.forEach((enemy) => {
    enemy.sound = true;
  });
}

/**
 * This function turns the bottle sound off.
 */
function bottleMute() {
  world.flyingBottle.sound = false;
  world.bottle.sound = false;
}

/**
 * This function turns the bottle sound on.
 */
function bottleMuteOff() {
  world.flyingBottle.sound = true;
  world.bottle.sound = true;
}

/**
 * This function toggles d-none for the control buttons if character.x > 3000.
 */
function showControl() {
  let control = document.getElementById("control");
  control.classList.toggle("d-none");
  checkCharacterPosition();
}

/**
 * This function add d-none to the contorl buttons.
 */
function setControlPermanentDnone() {
  let control = document.getElementById("control");
  control.classList.add("d-none");
}

/**
 * This function checks the character.x position.
 */
function checkCharacterPosition() {
  setInterval(() => {
    if (world.character.x >= 4100) {
      setControlPermanentDnone();
    }
  }, 100);
}

/**
 * This function stops sound if click restart early after game over or win situation.
 */
function stopSounds() {
  if (endbosses.boss_dead_guitar.currentTime > 0) {
    endbosses.boss_dead_guitar.pause();
    endbosses.boss_dead_guitar.currentTime = 0;
  }
  if (world.character.lose.currentTime > 0) {
    world.character.lose.pause();
    world.character.lose.currentTime = 0;
  }
  if (world.character.game_over.currentTime > 0) {
    world.character.game_over.pause();
    world.character.game_over.currentTime = 0;
  }
}

/**
 * This function restart the hole level.
 */
function restartGameComplete() {
  stopSounds();
  restartCharacter();
  restartLevel();
  restartCloud();
  removeGameOverScreen();
  restartStatusBar();
  restartbottleBar();
  restartCoinBar();
  restartBossBar();
  restartBossIcon();
  removeWinScreen();
  restartWorld();
  setPowerEndboss();
  gameOver();
}

/**
 * This function reset the power of endboss.
 */
function setPowerEndboss() {
  let enemyIndex = world.level.enemies.length - 1;

  let endbossPower = world.level.enemies[enemyIndex];
  endbossPower.power = 25;
  endbossPower.powerChecker = 25;
}

/**
 * This function set d-none to the win screen.
 */
function removeWinScreen() {
  let winScreen = document.getElementById("win");

  winScreen.classList.add("d-none");
}

/**
 * This function add d-none to game over and restart screen/button.
 */
function removeGameOverScreen() {
  let gameOverScreen = document.getElementById("game_over_screen");
  let restart = document.getElementById("restart");

  gameOverScreen.classList.add("d-none");
  restart.classList.add("d-none");
}

/**
 * This function restart the hole settings for character power/bottle/coins/position.
 */
function restartCharacter() {
  world.character.initCharacter();
}

/**
 * This function set a new level if click on restart.
 */
function restartLevel() {
  setLevel();
  restartCamera();
}

/**
 * This function is to set the character back on start position.
 */
function restartCamera() {
  world.camera_x = 0;
  world.character.x = 100;
  world.character.y = 50;
  world.character.startCharacter();
  world.character.power = 100;
}

/**
 * This function is to set the variable at start of the game.
 */
function getInitsEnemy() {
  world.level.enemies.forEach((enemy) => {
    if (enemy.get_smash) {
      chickenInit = enemy.initChicken;
      chickens = enemy;
    } else if (enemy.chicken_smash) {
      smallChickenInit = enemy.initSmallChicken;
      smallChickens = enemy;
    } else {
      endbossInit = enemy.initEndboss;
      endbosses = enemy;
    }
  });
  setCloudVar();
  levelNew = world.level;
}

/**
 * This function is to generate level2 after clicking on restart.
 */
function loadNewLevel() {
  world.level.initLevel(
    enemies,
    clouds,
    background,
    collectable,
    collectable,
    collectableBottle
  );
}

/**
 * This function is to set new clouds.
 */
function restartCloud() {
  cloud.initCloud();
}
let cloud;

/**
 * This function is to set the variable at start.
 */
function setCloudVar() {
  cloud = world.level.cloud[0];
}

/**
 * This function is to reset the statusbar (power).
 */
function restartStatusBar() {
  world.statusBar.percent = 100;
  world.statusBar.setPercentage(100);
}

/**
 * This function is to restart the bottle in randomly in the game.
 */
function restartThrowable() {
  world.flyingBottle.initThrowable();
}

/**
 * This function is to restart the class world.
 */
function restartWorld() {
  world.initWorld();
}
/**
 * This function is restart the background.
 */
function restartBackground() {
  world.level.background[0].initBackground();
}

/**
 * This function is to restart the boss icon and make it invisible.
 */
function restartBossIcon() {
  world.bossIcon.width = 0;
}

/**
 * This function is restart the bottlebar.
 */
function restartbottleBar() {
  world.bottleBar.initBottleBar();
}

/**
 * This function is to restart boss energy bar.
 */
function restartBossBar() {
  world.bossBar.initBossBar();
}

/**
 * This function is to restart the coinbar and set it to zero.
 */
function restartCoinBar() {
  world.coinbar.initCoinBar();
}

/**
 * This function is restart the coins to collect in the game randomly.
 */
function restartCollects() {
  world.collectable.initCollects();
}
