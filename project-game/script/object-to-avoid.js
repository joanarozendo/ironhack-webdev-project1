class ObjectToAvoid {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.objectToAvoidPosition = {
      x: 0,
      y: 0
    }
  }

  randomObjectToAvoidPosition() {
    this.objectToAvoidPosition.x = Math.floor(Math.random() * 15) * 50;
    this.objectToAvoidPosition.y = 0;
  }

  paint() {
    const image = new Image();
    image.src = "./style/images/stake.png";
    const imageHeight = image.height;
    const imageWidth = image.width;
    const size = 0.2;
    this.context.drawImage(image, this.objectToAvoidPosition.x, this.objectToAvoidPosition.y, imageWidth * size, imageHeight * size);
  }

  movingObjectToAvoid() {
    this.objectToAvoidPosition.y += 3;
  }
}