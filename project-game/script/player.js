class Player {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.playerPosition = {
      x: 20,
      y: 350
    }
  }

  paint() {
    const image = new Image();
    image.src = "./style/images/character_zombie_run0.png";
    const imageHeight = image.height;
    const imageWidth = image.width;
    this.context.drawImage(image, this.playerPosition.x, this.playerPosition.y, imageWidth, imageHeight);
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  moveLeft() {
    if (this.playerPosition.x >= 20) {
      this.playerPosition.x -= 30;
    } else {
      this.playerPosition.x = this.playerPosition.x;
    }
  }
  
  moveRight() {
    if (this.playerPosition.x <= 690) {
      this.playerPosition.x += 30;
    } else {
    }
    this.playerPosition.x = this.playerPosition.x;
  }

  left() {
    return this.x;
  }

  right() {
    return this.x + this.width;
  }

  top() {
    return this.y;
  }

  bottom() {
    return this.y + this.height;
  }

  checkCollisions(objectToAvoid) {
    return !(
      this.bottom() < objectToAvoid.top() ||
      this.top() > objectToAvoid.bottom() ||
      this.right() < objectToAvoid.left() ||
      this.left() > objectToAvoid.right()
    );
  }

}