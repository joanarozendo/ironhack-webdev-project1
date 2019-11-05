class ObjectToAvoid {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.velocityY = 3;
    this.image = new Image();
    this.image.src = "./style/images/stake1.png";
    this.imageHeight = this.image.height * 0.2;
    this.imageWidth = this.image.width * 0.2;
  }

  randomObjectToAvoidPosition() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
  }

  movingObjectToAvoid() {
    this.y += this.velocityY;
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