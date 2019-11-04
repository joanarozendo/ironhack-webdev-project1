/* class ObjectToCatch {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.objectToCatchPosition = {
      x: 0,
      y: 0
    }
  }

  randomObjectToCatchPosition() {
    this.objectToCatchPosition.x = Math.floor(Math.random() * 15) * 50;
    this.objectToCatchPosition.y = 0;
  }

  paint() {
    const image = new Image();
    image.src = "./style/images/brain1.png";
    const imageHeight = image.height;
    const imageWidth = image.width;
    const size = 0.08;
    this.context.drawImage(image, this.objectToCatchPosition.x, this.objectToCatchPosition.y, imageWidth * size, imageHeight * size);
  }

  movingObjectToCatch() {
    this.objectToCatchPosition.y += 3;
  }
} */