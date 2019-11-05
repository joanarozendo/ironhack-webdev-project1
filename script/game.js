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
    this.objectToAvoid = new ObjectToAvoid(this);
    this.objectToCatch = new ObjectToCatch(this);
    this.coffeeBonus = new CoffeeBonus(this);
    this.heartBonus = new HeartBonus(this);
    this.objectToAvoidArray = [];
    this.objectToCatchArray = [];
    this.coffeeBonusArray = [];
    this.heartBonusArray = [];
    this.objectToAvoidTimer = 0;
    this.objectToCatchTimer = 0;
    this.coffeeBonusTimer = 0;
    this.heartBonusTimer = 0;
    this.objectToAvoidSpeed = 1500;
    this.objectToCatchSpeed = 1200;
    this.coffeeBonusSpeed = 6000;
    this.heartBonusSpeed = 4000;
    this.life = 3;
    this.score = 0;
  }
  
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  start() {
    this.animation();
  }

  animation(timestamp) {
    if (this.life > 0 && this.score < 10) {
      this.paintEverything(timestamp);
      window.requestAnimationFrame(timestamp => this.animation(timestamp));
      } else if (this.life > 0 && this.score >= 10) {
         this.gameWon();
      } else {
          this.gameOver();
        }
      }
        
  paintEverything(timestamp) {
    this.clear();
    this.background.paint();
    this.player.paint();

    this.createObjectToAvoid(timestamp);
    for (let i = 0; i < this.objectToAvoidArray.length; i++) {
      const randomObjectToAvoid = this.objectToAvoidArray[i];
      randomObjectToAvoid.paint();
      randomObjectToAvoid.movingObjectToAvoid();
      if (this.checkCollisions(randomObjectToAvoid)) {
        this.objectToAvoidArray.splice(i, 1);
        this.life -= 1;
        console.log(`current lives: ${this.life}`);
      }
    }
    this.lifeCount();
    
    this.createObjectToCatch(timestamp);
    for (let i = 0; i < this.objectToCatchArray.length; i++) {
      const randomObjectToCatch = this.objectToCatchArray[i];
      randomObjectToCatch.paint();
      randomObjectToCatch.movingObjectToCatch();
      if (this.checkCollisions(randomObjectToCatch)) {
        this.objectToCatchArray.splice(i, 1);
        this.score += 1;
        console.log(`current score: ${this.score}`);
      }
    }
    this.scoreboard();
    
    this.createCoffeeBonus(timestamp);
    for (let i = 0; i < this.coffeeBonusArray.length; i++) {
      const randomCoffeeBonus = this.coffeeBonusArray[i];
      randomCoffeeBonus.paint();
      randomCoffeeBonus.movingCoffeeBonus();
      if (this.checkCollisions(randomCoffeeBonus)) {
        this.coffeeBonusArray.splice(i, 1);
        this.life += 1;
        console.log('You got an extra life!');
      }
    }

    this.createHeartBonus(timestamp);
    for (let i = 0; i < this.heartBonusArray.length; i++) {
      const randomHeartBonus = this.heartBonusArray[i];
      randomHeartBonus.paint();
      randomHeartBonus.movingHeartBonus();
      if (this.checkCollisions(randomHeartBonus)) {
        this.heartBonusArray.splice(i, 1);
        console.log('You got faster!');
      }
    }
  }

  createObjectToAvoid(timestamp) {
    if (this.objectToAvoidTimer < timestamp - this.objectToAvoidSpeed) {

      const objectToAvoid = new ObjectToAvoid(this);
      objectToAvoid.randomObjectToAvoidPosition();      
      this.objectToAvoidArray.push(objectToAvoid);

      this.objectToAvoidTimer = timestamp;
    }
  } 

  createObjectToCatch(timestamp) {
    if (this.objectToCatchTimer < timestamp - this.objectToCatchSpeed) {

      const objectToCatch = new ObjectToCatch(this);
      objectToCatch.randomObjectToCatchPosition();      
      this.objectToCatchArray.push(objectToCatch);

      this.objectToCatchTimer = timestamp;
    }
  } 

  createCoffeeBonus(timestamp) {
    if (this.coffeeBonusTimer < timestamp - this.coffeeBonusSpeed) {

      const coffeeBonus = new CoffeeBonus(this);
      coffeeBonus.randomCoffeeBonus();      
      this.coffeeBonusArray.push(coffeeBonus);

      this.coffeeBonusTimer = timestamp;
    }
  } 

  createHeartBonus(timestamp) {
    if (this.heartBonusTimer < timestamp - this.heartBonusSpeed) {

      const heartBonus = new HeartBonus(this);
      heartBonus.randomHeartBonus();      
      this.heartBonusArray.push(heartBonus);

      this.heartBonusTimer = timestamp;
    }
  } 

  /* createFallingObjects() {

    createObjectToAvoid(timestamp) {
      if (this.objectTimer < timestamp - this.objectToAvoidSpeed) {
  
        const objectToAvoid = new ObjectToAvoid(this);
        objectToAvoid.randomObjectToAvoidPosition();      
        this.objectToAvoidArray.push(objectToAvoid);
  
        this.objectTimer = timestamp;
      }
    
  
    createObjectToCatch(timestamp) {
      if (this.objectTimer < timestamp - this.objectToCatchSpeed) {
  
        const objectToCatch = new ObjectToCatch(this);
        objectToCatch.randomObjectToCatchPosition();      
        this.objectToCatchArray.push(objectToCatch);
  
        this.objectTimer = timestamp;
      }
    } 
  
    createCoffeeBonus(timestamp) {
      if (this.objectTimer < timestamp - this.coffeeBonusSpeed) {
  
        const coffeeBonus = new CoffeeBonus(this);
        coffeeBonus.randomCoffeeBonus();      
        this.coffeeBonusArray.push(coffeeBonus);
  
        this.objectTimer = timestamp;
      }
    } 
  
    createHeartBonus(timestamp) {
      if (this.objectTimer < timestamp - this.heartBonusSpeed) {
  
        const heartBonus = new HeartBonus(this);
        heartBonus.randomHeartBonus();      
        this.heartBonusArray.push(heartBonus);
  
        this.objectTimer = timestamp;
      }
    } 
  } */

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

  gameOver() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monospace';
    this.context.fillText('GAME OVER', 200, this.height/2);
  }

  gameWon() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monospace';
    this.context.fillText('YOU WON!', 220, this.height/2);
  }

  scoreboard() {
    this.context.fillStyle = "white";
    this.context.font = '20px monospace';
    this.context.fillText(`Score: ${this.score}`, 15, 60);
  }
  
  lifeCount() {
    this.context.fillStyle = "white";
    this.context.font = '20px monospace';
    this.context.fillText(`Lives: ${this.life}`, 15, 30);
  }

}



  
 
