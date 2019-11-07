const $canvas = document.querySelector('canvas');

/* 
const $score = document.querySelector('h1');
$score.innerHTML = "CLASSROOM MADNESS"
console.dir($score);
*/
const context = $canvas.getContext('2d');
context.fillStyle = 'black'
context.fillRect(0, 0, $canvas.width, $canvas.height)
context.fillStyle = 'white';
context.font = '60px monogram';
context.fillText('START GAME', 240, 250);
context.font = '25px monogram';
context.fillText(`Press 'Enter' to start`, 275, 300);


document.addEventListener('keydown', () => {
  if (event.keyCode === 13) {
    const game = new Game ($canvas);
    game.start();
    }
  });



/* document.addEventListener('keydown', () => {
  if(event.keyCode === 13) {
    const game = new Game ($canvas);
    game.start();
  }
}); */



/* if true start game, if false start screen */
