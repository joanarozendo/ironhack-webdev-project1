/* class Bonus {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.bonusPosition = {
      x: 0,
      y: 0
    }
  }

  randomBonusPosition() {
    this.bonusPosition.x = Math.floor(Math.random() * 15) * 50;
    this.bonusPosition.y = 0;
  }

  paint() {
    const image = new Image();
    image.src = "./style/images/coffee.png";
    const imageHeight = image.height;
    const imageWidth = image.width;
    const size = 0.08;
    this.context.drawImage(image, this.bonusPosition.x, this.bonusPosition.y, imageWidth * size, imageHeight * size);
  }

  movingBonus() {
    this.bonusPosition.y += 3;
  }
} */