class ObjectToCatch {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.velocityY = 3;
    this.jsImage = new Image();
    this.jsImage.src = "./style/images/JS.png";
    this.htmlImage = new Image();
    this.htmlImage.src = "./style/images/HTML.png";
    this.cssImage = new Image();
    this.cssImage.src = "./style/images/CSS.png";
    this.nodeImage = new Image();
    this.nodeImage.src = "./style/images/node.png";
    this.reactImage = new Image();
    this.reactImage.src = "./style/images/react.png";
    this.objectToCatchArr = [this.jsImage, this.htmlImage, this.cssImage, this.nodeImage, this.reactImage];
    this.randomObjectToCatchImage = this.objectToCatchArr[Math.floor(Math.random() * this.objectToCatchArr.length)];
    this.imageWidth = 50;
    this.imageHeight = 50;
    
  }

  randomObjectToCatchPosition() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.randomObjectToCatchImage, this.x, this.y, this.imageWidth, this.imageHeight);
  }

  movingObjectToCatch() {
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