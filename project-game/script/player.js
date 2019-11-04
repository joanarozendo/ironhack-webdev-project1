class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.x = 20;
    this.y = 370;
    this.image = new Image();
    this.image.src = "./style/images/character_zombie_run01.png";
    this.imageHeight = this.image.height;
    this.imageWidth = this.image.width;
    this.image.onload;
  }

  paint() {
    this.context.drawImage(this.image, this.x, this.y, this.imageWidth, this.imageHeight);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  moveLeft() {
    if (this.x >= 20) {
      this.x -= 30;
    } else {
      this.x = this.x;
    }
  }
  
  moveRight() {
    if (this.x <= 690) {
      this.x += 30;
    } else {
    }
    this.x = this.x;
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