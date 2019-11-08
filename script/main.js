const $canvas = document.querySelector('canvas');

window.addEventListener('load', () => {
  const game = new Game ($canvas);
  game.startScreen();
});

document.addEventListener('keydown', () => {
  if (event.keyCode === 13) {
    const game = new Game ($canvas);
    /* gameOverSound.pause();
    gameOverSound.currentTime = 0;
    gameWonSound.pause();
    gameWonSound.currentTime = 0; */
    theme.play();
    game.start();    
  }
});

function fullscreen(){
  var fs = document.querySelector('canvas');
  if (fs.webkitRequestFullScreen) {
    fs.webkitRequestFullScreen();
  } else {
    fs.mozRequestFullScreen();
  }
  canvas.addEventListener("click", fullscreen);
}
fullscreen();
