class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.x = 20;
    this.y = 305;
    this.velocityX = 20;
    this.image = new Image();
    // this.image.src = "./style/images/girl1.png";
    this.image.src = "./style/images/girl1.png";
    this.imageHeight = this.image.height * 1.1;
    this.imageWidth = this.image.width * 1.1;

    this.lowLifeImage = new Image();
    this.lowLifeImage.src = "./style/images/girl2.png";
    this.lowLifeImageWidth = this.lowLifeImage.width * 1.1;
    this.lowLifeImageHeight = this.lowLifeImage.height * 1.1;
  }

  paint() {
    if (this.game.life === 1) {
      this.context.drawImage(this.lowLifeImage, this.x, this.y, this.lowLifeImageWidth, this.lowLifeImageHeight)
    } else {
      this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  moveLeft() {
    if ((this.x - this.velocityX) >= 10) {
      this.x -= this.velocityX;
    } else {
      this.x = this.x;
    }
  }
  
  moveRight() {
    if ((this.x + this.velocityX) <= 710) {
      this.x += this.velocityX;
    } else {
      this.x = this.x;
    }
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