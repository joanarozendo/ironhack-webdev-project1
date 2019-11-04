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
    this.bonus = new Bonus(this);
    this.objectToAvoidArray = [];
    this.objectToCatchArray = [];
    this.bonusArray = [];
    this.objectTimer = 0;
    this.speed = 1500;
    this.life = 3;
    this.score = 0;
  }
  
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  start() {
    this.animation();
  }

  paintEverything(timestamp) {
    this.clear();
    this.background.paint();
    this.player.paint();
    this.createObject(timestamp);
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

    for (let i = 0; i < this.bonusArray.length; i++) {
      const randomBonus = this.bonusArray[i];
      randomBonus.paint();
      randomBonus.movingBonus();
      if (this.checkCollisions(randomBonus)) {
        this.bonusArray.splice(i, 1);
        console.log('You got a bonus!');
      }
    }
  }

  animation(timestamp) {
    if (this.life > 0) {
      this.paintEverything(timestamp);
      window.requestAnimationFrame(timestamp => this.animation(timestamp));
    } else {
      this.gameOver();
    }
  }
  
  createObject(timestamp) {
    if (this.objectTimer < timestamp - this.speed) {

      const objectToAvoid = new ObjectToAvoid(this);
      objectToAvoid.randomObjectToAvoidPosition();      
      this.objectToAvoidArray.push(objectToAvoid);

      const objectToCatch = new ObjectToCatch(this);
      objectToCatch.randomObjectToCatchPosition();      
      this.objectToCatchArray.push(objectToCatch);

      const bonus = new Bonus(this);
      bonus.randomBonus();      
      this.bonusArray.push(bonus);

      this.objectTimer = timestamp;
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

  gameOver() {
    this.clear();
    this.context.fillStyle = 'black';
    this.context.fillRect(0, 0, this.width, this.height);
    this.context.fillStyle = 'white';
    this.context.font = '80px monospace';
    this.context.fillText('GAME OVER', 200, this.height/2);
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



  
 
