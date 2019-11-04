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
    /* this.objectToCatch = new ObjectToCatch(this);
    this.bonus = new Bonus(this); */
    this.objectToAvoidArray = [];
    /* this.objectToCatchArray = [];
    this.bonusArray = []; */
    this.objectTimer = 0;
    this.speed = 1500;
  }
  
  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  start() {
    this.animation();
  }

  animation(timestamp) {
    this.paintEverything(timestamp);
    window.requestAnimationFrame(timestamp => this.animation(timestamp));
  }

  
  paintEverything(timestamp) {
    this.clear();
    this.background.paint();
    this.player.paint();
    this.createObject(timestamp);
    for (let i = 0; i < this.objectToAvoidArray.length; i++) {
      this.objectToAvoidArray[i].paint();
      this.objectToAvoidArray[i].movingObjectToAvoid();
    }
    /* for (let i = 0; i < this.objectToCatchArray.length; i++) {
      this.objectToCatchArray[i].paint();
      this.objectToCatchArray[i].movingObjectToCatch();
    }
    for (let i = 0; i < this.bonusArray.length; i++) {
      this.bonusArray[i].paint();
      this.bonusArray[i].movingBonus();
    } */
  }

  createObject(timestamp) {
    if (this.objectTimer < timestamp - this.speed) {
      const objectToAvoid = new ObjectToAvoid(this);
      objectToAvoid.randomObjectToAvoidPosition();      
      this.objectToAvoidArray.push(objectToAvoid);
      /* const objectToCatch = new ObjectToCatch(this);
      objectToCatch.randomObjectToCatchPosition();      
      this.objectToCatchArray.push(objectToCatch);
      const bonus = new Bonus(this);
      bonus.randomBonusPosition();      
      this.bonusArray.push(bonus); */
      this.objectTimer = timestamp;
    }
  }
}