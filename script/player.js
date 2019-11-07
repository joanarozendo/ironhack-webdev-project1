class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.x = 20;
    this.y = 305;
    this.velocityX = 20;

    this.image = new Image();
    this.image.src = "./style/images/girl1.png";
    this.imageHeight = this.image.height * 1.1;
    this.imageWidth = this.image.width * 1.1;

    this.worriedImage = new Image();
    this.worriedImage.src = "./style/images/girl2.png";
    this.worriedImageImageWidth = this.worriedImage.width * 1.1;
    this.worriedImageHeight = this.worriedImage.height * 1.1;

    this.veryWorriedImage = new Image();
    this.veryWorriedImage.src = "./style/images/girl3.png";
    this.veryWorriedImageWidth = this.veryWorriedImage.width * 1.1;
    this.veryWorriedImageHeight = this.veryWorriedImage.height * 1.1;

    this.lowLifeImage = new Image();
    this.lowLifeImage.src = "./style/images/girl4.png";
    this.lowLifeImageWidth = this.lowLifeImage.width * 1.1;
    this.lowLifeImageHeight = this.lowLifeImage.height * 1.1;

    this.panicImage = new Image();
    this.panicImage.src = "./style/images/girl5.png";
    this.panicImageWidth = this.panicImage.width * 1.1;
    this.panicImageHeight = this.panicImage.height * 1.1;
  }

  paint() {
      if (this.game.life === 5) {
        this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
      } else if (this.game.life === 4) {
        this.context.drawImage(this.worriedImage, this.x, this.y, this.worriedImageImageWidth, this.worriedImageHeight);
      } else if (this.game.life === 3) {
        this.context.drawImage(this.veryWorriedImage, this.x, this.y, this.veryWorriedImageWidth, this.veryWorriedImageHeight)
      } else if (this.game.life === 2) {
        this.context.drawImage(this.lowLifeImage, this.x, this.y, this.lowLifeImageWidth, this.panicImageHeight);
      } else {
        this.context.drawImage(this.panicImage, this.x, this.y, this.panicImageWidth, this.panicImageHeight)
    }
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  moveLeft() {
    if ((this.x) >= 20) {
      this.x -= this.velocityX;
    } else {
      this.x = this.x;
    }
  }
  
  moveRight() {
    if ((this.x) <= 695) {
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