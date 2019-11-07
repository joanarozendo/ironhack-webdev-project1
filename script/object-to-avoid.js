class ObjectToAvoid {
  constructor(game) {
    this.game = game;
    this.width = 50;
    this.heigth = 20;
    this.context = game.context;
    this.x = 0;
    this.y = 0;
    this.velocityY = 3;
    this.instaImage = new Image();
    this.instaImage.src = "./style/images/instagram.png";
    this.facebookImage = new Image();
    this.facebookImage.src = "./style/images/facebook.png";
    this.phoneImage = new Image();
    this.phoneImage.src = "./style/images/netflix.png";
    this.tvImage = new Image();
    this.tvImage.src = "./style/images/television.png";
    this.joystickImage = new Image();
    this.joystickImage.src = "./style/images/joystick.png";
    this.snoozeImage = new Image();
    this.snoozeImage.src = "./style/images/snooze.png";
    this.objectToAvoidArr = [this.instaImage, this.facebookImage, this.phoneImage, this.tvImage, this.joystickImage, this.snoozeImage];
    this.randomObjectToAvoidImage = this.objectToAvoidArr[Math.floor(Math.random() * this.objectToAvoidArr.length)];
    this.imageWidth = 50;
    this.imageHeight = 50;
  }

  randomObjectToAvoidPosition() {
    this.x = Math.floor(Math.random() * 15) * 50;
    this.y = 0;
  }

  paint() {
    this.context.drawImage(this.randomObjectToAvoidImage, this.x, this.y, this.imageWidth, this.imageHeight);
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