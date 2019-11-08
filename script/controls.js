class Controls {
  constructor(game) {
    this.game = game;
  }

  setKeyBindings() {
    window.addEventListener('keydown', event => {
      if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      };
      switch (event.keyCode) {
        case 37:
          // this.game.player.moveLeft();
          this.game.player.direction = 'left';
          break;
        case 39:
            // this.game.player.moveRight();
            this.game.player.direction = 'right';
          break;
        };
    });

    window.addEventListener('keyup', event => {
      if([37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
      };
      switch (event.keyCode) {
        case 37:
        case 39:
            this.game.player.direction = null;
          break;
        };
    });
  }
}