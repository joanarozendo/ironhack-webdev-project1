const $canvas = document.querySelector('canvas');
const game = new Game ($canvas);


  const $triggerGameStart = document.querySelector('button');
  $triggerGameStart.addEventListener('click', () => {
    game.start();
  });

