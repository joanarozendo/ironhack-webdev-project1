class Bonus {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "./style/images/coffee1.png";
    this.imageHeight = this.image.height * 0.05;
    this.imageWidth = this.image.width * 0.05;
  }

  randomBonus() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
  }

  movingBonus() {
    this.y += 3;
  }
  
  left() {
    return this.x;
  }

  right() {
    return this.x + this.imageWidth;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.imageHeight;
  }
}