class Game {
  constructor($canvas) {
    this.$canvas = $canvas;
    this.context = this.$canvas.getContext('2d');
    this.width = this.$canvas.width;
    this.height = this.$canvas.height;
    this.controls = new Controls(this);
    this.controls.setKeyBindings();
    this.player = new Player(this);
    this.background = new Background(this);
    // this.screen = new Screen(this);
    // this.objectToAvoid = new ObjectToAvoid(this);
    // this.objectToCatch = new ObjectToCatch(this);
    // this.coffeeBonus = new CoffeeBonus(this);
    // this.heartBonus = new HeartBonus(this);
    this.objectToAvoidArray = [];
    this.objectToCatchArray = [];
    this.coffeeBonusArray = [];
    this.heartBonusArray = [];
    this.objectToAvoidTimer = 0;
    this.objectToCatchTimer = 0;
    this.coffeeBonusTimer = 0;
    this.heartBonusTimer = 0;
    this.objectToAvoidSpeed = 1400;
    this.objectToCatchSpeed = 1200;
    this.coffeeBonusSpeed = 8000;
    this.heartBonusSpeed = 10000;
    this.life = 5;
    this.score = 0;
    this.level = 1;
    this.fullHeartImage = new Image();
    this.fullHeartImage.src = "./style/images/heart.png";
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


/*   drawFullHeart() {
    this.context.drawImage(this.fullHeartImage, 300, 50, this.fullHeartImage.width, this.fullHeartImage.height);
  } */
/* 
  drawEmptyHeart() {
    const emptyHeartImage = new Image();
    this.emptyHeartImage.src = "./style/images/heart-border.png";
    this.context.drawImage(this.emptyHeartImage, 350, 50, this.emptyHeartImage.width, this.emptyHeartImage.height);
  } */

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  animation(timestamp) {
    if (this.life > 0 && this.score % 10 === 0 && this.score !== 0) {
      this.levelUp();
      this.paintEverything(timestamp);
    } else if (this.life > 0) {
      this.paintEverything(timestamp);
    } else {
      this.gameOver();
    }
    window.requestAnimationFrame(timestamp => this.animation(timestamp));
  }

  start() {
    this.animation();
  }

/*   drawLevelUpScreen() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monospace';
    this.context.fillText('LEVEL UP', 220, this.height/2);
  }
 */

  levelUp() {
    this.level += 1;
    this.score += 1;
    this.updateObjectSpeedLevel();
  }
  
  updateObjectSpeedLevel() {
    this.objectToAvoidSpeed -= 200;
    this.objectToCatchSpeed -= 200;
    //this.objectToAvoid.velocityY += 10;
    //this.objectToCatch.velocityY += 10;
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
  }
  
  paintFallingObjects(timestamp) {
    this.createFallingObjects(timestamp);
    for (let i = 0; i < this.objectToAvoidArray.length; i++) {
      const randomObjectToAvoid = this.objectToAvoidArray[i];
      randomObjectToAvoid.paint();
      randomObjectToAvoid.movingObjectToAvoid();
      if (this.checkCollisions(randomObjectToAvoid)) {
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
        this.coffeeBonusArray.splice(i, 1);
        let fasterPlayer = setInterval(() => this.player.velocityX += 3, 400);
        setTimeout(() => { clearInterval(fasterPlayer); this.player.velocityX = 20 }, 5000);
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
    this.context.font = '25px monogram';
    this.context.fillText(`LIVES: ${this.life}`, 710, 50);
    //this.lifeCheck();
  }
/* 
  lifeCheck() {
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
    } else if (this.life = 3) {
      this.context.drawImage(this.emptyHeartImage, 695, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 715, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 735, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 2) {
      this.context.drawImage(this.emptyHeartImage, 695, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 715, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 735, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 755, 10, this.fullHeartImage.width, this.fullHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } else if (this.life = 1) {
      this.context.drawImage(this.emptyHeartImage, 695, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 715, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 735, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.emptyHeartImage, 755, 10, this.emptyHeartImage.width, this.emptyHeartImage.height);
      this.context.drawImage(this.fullHeartImage, 775, 10, this.fullHeartImage.width, this.fullHeartImage.height);
    } 
  } */

  levelBoard() {
    this.context.fillStyle = "white";
    this.context.font = '35px monogram';
    this.context.fillText(`LEVEL ${this.level}`, 15, 30);
  }
  
  scoreboard() {
    this.context.fillStyle = "white";
    this.context.font = '25px monogram';
    this.context.fillText(`SCORE: ${this.score}`, 15, 60);
  }

  gameOver() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monogram';
    this.context.fillText('GAME OVER', 200, 250);
    this.context.font = '40px monogram';
    this.context.fillText(`Your score: ${this.score}`, 200, 300);
  }
  
   /* gameWon() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monogram';
    this.context.fillText('YOU WON!', 220, 250);
  } */
}



  
 
