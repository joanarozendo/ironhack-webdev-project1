/* class LifeCount {
  constructor(game) {
    this.game = game;
    this.context = game.context;
    this.life = game.life;
    this.fullHeartImage = new Image();
    this.fullHeartImage.src = "./style/images/heart.png";
    this.emptyHeartImage = new Image();
    this.emptyHeartImage.src = "./style/images/heart-black.png";
  }

  drawLifeCount() {
    this.context.fillStyle = "white";
    this.context.font = '25px monogram';
    this.context.fillText(`LIVES: ${this.life}`, 710, 50);
    if (this.life = 5) {
      this.context.drawImage(this.fullHeartImage, 695, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 4) {
      this.context.drawImage(this.emptyHeartImage, 695, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 4) {
      this.context.drawImage(this.fullHeartImage, 695, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 4) {
      this.context.drawImage(this.fullHeartImage, 695, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 4) {
      this.context.drawImage(this.fullHeartImage, 695, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 4) {
      this.context.drawImage(this.fullHeartImage, 695, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 715, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    }
  }
}



 */