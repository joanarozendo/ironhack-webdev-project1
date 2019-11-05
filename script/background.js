class Background {
  constructor(game) {
    this.game = game;
    this.width = game.width;
    this.height = game.height;
    this.context = game.context;
  }

  paint() {
    const image = new Image();
    image.src = "./style/images/background.png";
    // image.src = "./style/images/background.png";
    this.context.drawImage(image, 0, 0, this.width, this.height);
  }
}

