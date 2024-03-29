class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext("2d");
    this.width = this.$canvas.width;
    this.height = this.$canvas.height;
    this.controls = new Controls(this);
    this.controls.setKeyBindings();
    this.player = new Player(this);
    this.background = new Background(this);
    this.objectToAvoidArray = [];
    this.objectToCatchArray = [];
    this.coffeeBonusArray = [];
    this.heartBonusArray = [];
    this.beerBonusArray = [];
    this.objectToAvoidTimer = 0;
    this.objectToCatchTimer = 0;
    this.coffeeBonusTimer = 0;
    this.heartBonusTimer = 0;
    this.beerBonusTimer = 0;
    this.objectToAvoidSpeed = 1400;
    this.objectToCatchSpeed = 1000;
    this.coffeeBonusSpeed = 8000;
    this.heartBonusSpeed = 10000;
    this.beerBonusSpeed = 13000;
    this.life = 5;
    this.score = 0;
    this.level = 1;
    this.heartImage = new Image();
    this.heartImage.src = "./style/images/heart.png";
    
    this.imageGirlDead = new Image();
    this.imageGirlDead.src = "./style/images/girldead.png";

    this.gameWonImage = new Image();
    this.gameWonImage.src = "./style/images/won.jpg";

    this.imageGirlParty = new Image();
    this.imageGirlParty.src = "./style/images/girlparty.png";

    this.loop;
    this.stopGame = false;
  }

  startScreen() {
    this.context.fillStyle = 'black'
    this.context.fillRect(0, 0, $canvas.width, $canvas.height);
    this.context.fillStyle = 'white';
    this.context.font = '110px monogram';
    this.context.fillText('START GAME', 190, 250);
    this.context.font = '40px monogram';
    this.context.fillText(`Press Enter`, 430, 300);
    this.context.font = '20px monogram';
    this.context.fillText(`click for fullscreen`, 20, 480);
  }

  paintEverything(timestamp) {
    this.clear();
    this.background.paint();
    this.lifeCount();
    this.levelBoard();
    this.scoreboard();
    this.paintFallingObjects(timestamp);
    this.player.paint();
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  animation(timestamp) {
    this.player.update();
    if (this.life > 0 && this.score % 10 === 0 && this.score !== 0) {
      this.levelUp();
      this.paintEverything(timestamp);
    } else if (this.life > 0 && this.level < 7) {
      this.paintEverything(timestamp);
    } else if (this.level === 7) {
      this.stopGame = true;
      this.gameWon();
      // this.stop();
      gameWonSound.play();
    } else if (this.life === 0) {
      this.stopGame = true;
      this.gameOver();
      // this.stop();
      gameOverSound.play();
    }
    this.loop =  window.requestAnimationFrame(timestamp => this.animation(timestamp));
    this.stop();
  }

  stop() {
    // console.log(this.stopGame);
    if (this.stopGame === true) {
      theme.pause();
      theme.currentTime = 0;
      faster.pause();
      // console.log(theme);
      faster.currentTime = 0;
      window.cancelAnimationFrame(this.loop);
    }
  }

  start() {
    gameOverSound.pause();
    gameOverSound.currentTime = 0;
    gameWonSound.pause();
    gameWonSound.currentTime = 0;
    this.animation();
  }

  levelUp() {
    this.level += 1;
    this.score += 1;
    this.updateObjectSpeedLevel();
    //console.log('level up');
  }

  updateObjectSpeedLevel() {
    this.objectToAvoidSpeed -= 200;
    this.objectToCatchSpeed -= 200;
  }

  createFallingObjects(timestamp) {
    if (this.objectToAvoidTimer < timestamp - this.objectToAvoidSpeed) {
      const objectToAvoid = new ObjectToAvoid(this);
      objectToAvoid.randomObjectToAvoidPosition();
      this.objectToAvoidArray.push(objectToAvoid);
      this.objectToAvoidTimer = timestamp;
    }
    if (this.objectToCatchTimer < timestamp - this.objectToCatchSpeed) {
      const objectToCatch = new ObjectToCatch(this);
      objectToCatch.randomObjectToCatchPosition();
      this.objectToCatchArray.push(objectToCatch);
      this.objectToCatchTimer = timestamp;
    }
    if (this.coffeeBonusTimer < timestamp - this.coffeeBonusSpeed) {
      const coffeeBonus = new CoffeeBonus(this);
      coffeeBonus.randomCoffeeBonus();
      this.coffeeBonusArray.push(coffeeBonus);
      this.coffeeBonusTimer = timestamp;
    }
    if (this.heartBonusTimer < timestamp - this.heartBonusSpeed) {
      const heartBonus = new HeartBonus(this);
      heartBonus.randomHeartBonus();
      this.heartBonusArray.push(heartBonus);
      this.heartBonusTimer = timestamp;
    }
    if (this.beerBonusTimer < timestamp - this.beerBonusSpeed) {
      const beerBonus = new BeerBonus(this);
      beerBonus.randomBeerBonus();
      this.beerBonusArray.push(beerBonus);
      this.beerBonusTimer = timestamp;
    }
  }

  paintFallingObjects(timestamp) {
    this.createFallingObjects(timestamp);
    for (let i = 0; i < this.objectToAvoidArray.length; i++) {
      const randomObjectToAvoid = this.objectToAvoidArray[i];
      randomObjectToAvoid.paint();
      randomObjectToAvoid.movingObjectToAvoid();
      if (this.checkCollisions(randomObjectToAvoid)) {
        //netflix.play();
        this.objectToAvoidArray.splice(i, 1);
        this.life -= 1;
        //console.log(`current lives: ${this.life}`);
      }
    }
    for (let i = 0; i < this.objectToCatchArray.length; i++) {
      const randomObjectToCatch = this.objectToCatchArray[i];
      randomObjectToCatch.paint();
      randomObjectToCatch.movingObjectToCatch();
      if (this.checkCollisions(randomObjectToCatch)) {
        this.objectToCatchArray.splice(i, 1);
        this.score += 1;
        //console.log(`current score: ${this.score}`);
      }
    }
    for (let i = 0; i < this.coffeeBonusArray.length; i++) {
      const randomCoffeeBonus = this.coffeeBonusArray[i];
      randomCoffeeBonus.paint();
      randomCoffeeBonus.movingCoffeeBonus();
      if (this.checkCollisions(randomCoffeeBonus)) {
        faster.play();
        theme.pause();
        this.coffeeBonusArray.splice(i, 1);
        let fasterPlayer = setInterval(() => (this.player.velocityX += 0.5), 400);
        setTimeout(() => {
          clearInterval(fasterPlayer);
          this.player.velocityX = 7;
          faster.pause();
          theme.play();
          faster.currentTime = 0;
          theme.currentTime = 0;
        }, 5000);
        //console.log('You got faster!');
      }
    }
    for (let i = 0; i < this.heartBonusArray.length; i++) {
      const randomHeartBonus = this.heartBonusArray[i];
      randomHeartBonus.paint();
      randomHeartBonus.movingHeartBonus();
      if (this.checkCollisions(randomHeartBonus)) {
        this.heartBonusArray.splice(i, 1);
        if (this.life < 5) {
          this.life += 1;
        }
        //console.log('You got an extra life!');
      }
    }

    for (let i = 0; i < this.beerBonusArray.length; i++) {
      const randomBeerBonus = this.beerBonusArray[i];
      randomBeerBonus.paint();
      randomBeerBonus.movingBeerBonus();
      if (this.checkCollisions(randomBeerBonus)) {
        this.beerBonusArray.splice(i, 1);
        this.life = 5;
        //console.log('You got an extra life!');
      }
    }
  }

  checkCollisions(object) {
    if (
      this.player.left() < object.right() &&
      this.player.right() > object.left() &&
      this.player.top() < object.bottom() &&
      this.player.bottom() > object.top()
    ) {
      return true;
    }
  }

  lifeCount() {
    this.context.fillStyle = "white";
    this.context.font = "25px monogram";
    //this.context.fillText(`LIVES: ${this.life}`, 710, 50);
  
    if (this.life === 5) {
      this.context.drawImage(this.heartImage, 665, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 690, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 715, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 740, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 765, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
    } else if (this.life === 4) {
      this.context.drawImage(this.heartImage, 690, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 715, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 740, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 765, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
    } else if (this.life === 3) {
      this.context.drawImage(this.heartImage, 715, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 740, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 765, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
    } else if (this.life === 2) {
      this.context.drawImage(this.heartImage, 740, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
      this.context.drawImage(this.heartImage, 765, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
    } else if (this.life === 1) {
      this.context.drawImage(this.heartImage, 765, 10, this.heartImage.width * 0.05, this.heartImage.height * 0.05);
    } 
  }

  levelBoard() {
    this.context.fillStyle = "white";
    this.context.font = "35px monogram";
    this.context.fillText(`LEVEL ${this.level}`, 15, 30);
  }

  scoreboard() {
    this.context.fillStyle = "white";
    this.context.font = "25px monogram";
    this.context.fillText(`SCORE: ${this.score}`, 15, 60);
  }
  
  gameOver() {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.drawImage(this.imageGirlDead, 550, 140, this.imageGirlDead.width * 1.4, this.imageGirlDead.height * 1.4);
    this.context.fillStyle = "white";
    this.context.font = "100px monogram";
    this.context.fillText("GAME OVER", 150, 235);
    this.context.font = "50px monogram";
    this.context.fillText(`Score: ${this.score}`, 150, 285);
    this.context.font = "40px monogram";
    this.context.fillText("Try again?", 150, 335);
    //gamewon.play();
    
  }

  gameWon() {
    this.context.drawImage(this.gameWonImage, 0, 0, this.gameWonImage.width, this.gameWonImage.height);
    // this.context.fillStyle = "black";
    // this.context.fillRect(0, 0, this.width, this.height);
    this.context.drawImage(this.imageGirlParty, 550, 150, this.imageGirlParty.width * 1.3, this.imageGirlParty.height * 1.3);
    this.context.fillStyle = "white";
    this.context.font = "70px monogram";
    this.context.fillText("YOU MADE IT!", 100, 220);
    this.context.font = "50px monogram";
    this.context.fillText(`Score: ${this.score}`, 100, 270);
  }
}
