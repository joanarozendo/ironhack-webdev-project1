const $canvas = document.querySelector('canvas');
const game = new Game ($canvas);

const context = $canvas.getContext('2d');
context.fillStyle = 'black'
context.fillRect(0, 0, $canvas.width, $canvas.height)
context.fillStyle = 'white';
context.font = '60px monospace';
context.fillText('CLASSROOM MADNESS', 115, 250);
context.font = '20px monospace';
context.fillText(`Press 'Enter' to play`, 275, 300);

/* const $triggerGameStart = document.querySelector('button');
$triggerGameStart.addEventListener('click', () => {
  game.start();
}); */

document.addEventListener('keypress', () => {
  game.start();
});