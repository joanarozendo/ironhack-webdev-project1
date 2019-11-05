class HeartBonus {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.image = new Image();
    this.image.src = "./style/images/heart.png";
    this.imageHeight = this.image.height;
    this.imageWidth = this.image.width;
  }

  randomHeartBonus() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
  }

  movingHeartBonus() {
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