

class Game {
  constructor() {
    this.startScreen = document.getElementById("logo-background");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.leftGame = document.getElementById("game-end-game-over");
    this.winner = document.getElementById("game-end-winner");
    this.obstacles = [];
    this.width = 500;
    this.height = 600;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 3;
    this.tokens = 0;
    this.door = false;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.tokenExists = false;
    this.doorExists = false;
    this.pickupMp3 = new Sound("./audio/item-pick-up-38258.mp3");
    this.gameOverMp3 = new Sound("./audio/080205_life-lost-game-over-89697.mp3");
    this.goVoiceMp3 = new Sound("./audio/game-over-31-179699.mp3");
    this.surpriseMp3 = new Sound("./audio/surprise-sound-effect-99300.mp3");
    this.exitMp3 = new Sound("./audio/8bit-music-for-game-68698.mp3");

    this.player = new Player(
      this.gameScreen,
      200,
      570,
      87,
      74,
      "./images/eris_rest.png"
    );

    this.enemy = new Enemy(
      this.gameScreen,
      200,
      20,
      100,
      150,
      "./images/chef_sml.png"
    ); 

  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";
    this.gameContainer.style.display = "flex";

    this.gameIntervalId = setInterval(() => {
      // console.log("starts game loop");
      this.gameLoop();
    }, this.gameLoopFrequency);
  }

  gameLoop() {
    console.log("game loop");
    this.update();

    if (this.gameIsOver === true) {
      clearInterval(this.gameIntervalId);
    }
  }

  getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

  // Create a new method responsible for ending the game
  endGame(check) {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());
    this.token.element.remove();
    //this.door.element.remove();

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    // Show end game screen
    //debugger;

    if(check){
      this.winner.style.display = "block";
      this.leftGame.style.display = "none";
      this.gameEndScreen.style.display = "flex";
    }else{
      this.winner.style.display = "none";
      this.leftGame.style.display = "block";
      this.gameEndScreen.style.display = "flex";
    }
  }

  playItOnce(){
    this.gameOverMp3.play();
    this.goVoiceMp3.play();
  }


  addToken(){

    this.tokenExists = true;
    // debugger;
    const randomX = this.getRandomInt(30, this.width-30);
    const randomY = this.getRandomInt(40, this.height-30);

      this.token = new Token(
      this.gameScreen,
      randomX,
      randomY,
      24,
      55,
      "./images/fish.png"
    );

    this.addBlink(this.token.element);
      
}

addDoor(){
  this.doorExists = true;

  const randomX = this.getRandomInt(40, this.width-30);
  const randomY = this.getRandomInt(50, this.height-30);

  this.door = new Door(
    this.gameScreen,
    randomX,
    randomY,
    100,
    100,
    "./images/door.png"
  );

}

addBlink(element){
  // debugger;
  var blink_speed = 500; // every 1000 == 1 second, adjust to suit
  var t = setInterval(function () {
    console.log(element);
    element.style.visibility = (element.style.visibility == 'hidden' ? '' : 'hidden');
  }, blink_speed);
}

  update() {

    console.log("update");

    this.playEnd = false;
    this.playOnceBool = false;
    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
        // If the player collides with an obstacle
        if (this.player.didCollide(obstacle)) {
          this.playOnceBool = true;
          // Remove the obstacle element from the DOM
          obstacle.element.remove();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Reduce player's lives by 1
          
          this.surpriseMp3.play();
         
          this.lives--;
          // Update the counter variable to account for the removed obstacle
          i--;
        } // If the obstacle is off the screen (at the bottom)
        else if (obstacle.top > this.height) {
          // Remove the obstacle from the DOM
          obstacle.element.remove();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Update the counter variable to account for the removed obstacle
          i--;
        }
        document.getElementById("lives").innerHTML = this.lives;
        
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

      // If the lives are 0, end the game
      if (this.lives === 0) {
        console.log("livees = zero");
        let boolWin = false;
        this.endGame(boolWin);
        this.lives = -1;
        if(this.lives===-1){
          this.playItOnce();
        }
      }

    if(!this.tokenExists&&!this.doorExists){
      this.addToken();
    }

    if(this.player.didCollideToken(this.token)){
      console.log("did collide");
      //debugger;
      this.pickupMp3.play();
      this.token.element.remove();
      this.tokens += 1;
      document.getElementById("score").innerHTML = this.tokens;
      this.tokenExists = false;
    }

    if(!this.doorExists && this.tokens===5){
     this.addDoor();
    }

    if(this.player.exited(this.door)){
      console.log("did exit");
      const winner = true;
      this.exitMp3.play();
      this.endGame(winner);
    }

  }

}