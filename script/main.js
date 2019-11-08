const $canvas = document.querySelector('canvas');

window.addEventListener('load', () => {
  const game = new Game ($canvas);
  game.startScreen();
});

document.addEventListener('keydown', () => {
  if (event.keyCode === 13) {
    const game = new Game ($canvas);
    game.start();
  }
});

/* function fullscreen(){
  var fs = document.querySelector('canvas');
  if (fs.webkitRequestFullScreen) {
    fs.webkitRequestFullScreen();
  } else {
    fs.mozRequestFullScreen();
  }
  canvas.addEventListener("click", fullscreen);
}
fullscreen(); */


/* 
const $score = document.querySelector('h1');
$score.innerHTML = "CLASSROOM MADNESS"
console.dir($score);
*/
