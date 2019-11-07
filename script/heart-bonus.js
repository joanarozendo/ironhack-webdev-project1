class HeartBonus {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.heartImage = new Image();
    this.heartImage.src = "./style/images/maria.png";
    this.heartImageHeight = this.heartImage.height * 0.2;
    this.heartImageWidth = this.heartImage.width * 0.2;
  }

  randomHeartBonus() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.heartImage, this.x, this.y, this.heartImageWidth, this.heartImageHeight);
  }

  movingHeartBonus() {
    this.y += 3;
  }
  
  left() {
    return this.x;
  }

  right() {
    return this.x + this.heartImageWidth;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.heartImageHeight;
  }
}