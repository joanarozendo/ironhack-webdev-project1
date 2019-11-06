class Background {
  constructor(game) {
    this.game = game;
    this.level = game.level;
    this.width = game.width;
    this.height = game.height;
    this.context = game.context;
    this.levelOneImage = new Image();
    this.levelOneImage.src = "./style/images/background1.jpg";
    this.levelTwoImage = new Image();
    this.levelTwoImage.src = "./style/images/background2.jpg";
    this.levelThreeImage = new Image();
    this.levelThreeImage.src = "./style/images/background3.jpg";
    this.levelFourImage = new Image();
    this.levelFourImage.src = "./style/images/background4.jpg";
    this.levelFiveImage = new Image();
    this.levelFiveImage.src = "./style/images/background5.jpg";
    this.levelSixImage = new Image();
    this.levelSixImage.src = "./style/images/background6.jpg";
    this.levelCrazyImage = new Image();
    this.levelCrazyImage.src = "./style/images/background7.jpg";

    }

  paint() {
    if (this.game.level === 1) {
      this.paintLevelOne();
    } else if (this.game.level === 2) {
      this.paintLevelTwo();
      
    } else if (this.game.level === 3) {
      this.paintLevelThree();
      
    } else if (this.game.level === 4) {
      this.paintLevelFour();
      
    } else if (this.game.level === 5) {
      this.paintLevelFive();
      
    } else if (this.game.level === 6) {
      this.paintLevelSix();
      
    } else if (this.game.level >= 7) {
      this.paintCrazyLevels();
    }
  }
  
  paintLevelOne() {
    this.context.drawImage(this.levelOneImage, 0, 0, this.width, this.height);
  }
  
  paintLevelTwo() {
    this.context.drawImage(this.levelTwoImage, 0, 0, this.width, this.height);
  }
  
  paintLevelThree() {
    this.context.drawImage(this.levelThreeImage, 0, 0, this.width, this.height);
  }
  
  paintLevelFour() {
    this.context.drawImage(this.levelFourImage, 0, 0, this.width, this.height);
  }
  
  paintLevelFive() {
    this.context.drawImage(this.levelFiveImage, 0, 0, this.width, this.height);
  }
  
  paintLevelSix() {
    this.context.drawImage(this.levelSixImage, 0, 0, this.width, this.height);
  }
  
  paintCrazyLevels() {
    this.context.drawImage(this.levelCrazyImage, 0, 0, this.width, this.height);
  }

}

