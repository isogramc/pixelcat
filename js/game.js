class Game {
  constructor() {
    this.startScreen = document.getElementById("logo-background");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.leftGame = document.getElementById("game-end-game-over");
    this.winner = document.getElementById("game-end-winner");
    this.whichToken = document.getElementById("next-token");
    this.obstacles = [];
    this.width = 500;
    this.height = 600;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 9;
    this.tokens = 0;
    this.door = undefined;
    this.gameIntervalId;
    this.blinkInterValId;
    this.minterval;
    this.timeoutID;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
    this.token = undefined;
    this.tokenExists = false;
    this.doorExists = false;
    this.pickupMp3 = new Sound("./audio/item-pick-up-38258.mp3");
    this.gameOverMp3 = new Sound("./audio/080205_life-lost-game-over-89697.mp3");
    this.goVoiceMp3 = new Sound("./audio/game-over-31-179699.mp3");
    this.surpriseMp3 = new Sound("./audio/surprise-sound-effect-99300.mp3");
    this.exitMp3 = new Sound("./audio/8bit-music-for-game-68698.mp3");
    this.imcounter = 0;
    this.positionEnemy = 0;

    this.player = new Player(
      this.gameScreen,
      200,
      570,
      87,
      74,
      "./images/eris_rest.png"
    );

    this.enemyA = new Character(
      this.gameScreen,
      20,
      20,
      100,
      150,
      "./images/a.png"
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
    //console.log("game loop");
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

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    // Show end game screen

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
    // add a random token to gameplay
    this.tokenExists = true;
    const randomX = this.getRandomInt(20, this.width-30);
    const randomY = this.getRandomInt(90, this.height-30);
    const link = [["pixel-cupcake.png", 45], ["pixel-yarn.png", 45], ["pixel-fish.png", 45], ["pixel-bone.png", 18]][Math.floor(Math.random() * 4)];
    let rToken = link[0];
    const randomToken = `./images/${ rToken }`;
    let a = link[0].split(".")[0];
    this.whichToken.innerHTML = a.split("-")[1];
      this.token = new Token(
      this.gameScreen,
      randomX,
      randomY,
      link[1],
      45,
      randomToken
    );
    this.addBlink(this.token.element);  
}

addDoor(){
  //this method adds a door randomly in a random location on the game screen when all tokens have been collected
  this.doorExists = true;

  const randomX = this.getRandomInt(140, this.width-80);
  const randomY = this.getRandomInt(50, this.height-80);

  this.door = new Component(
    this.gameScreen,
    randomX,
    randomY,
    100,
    100,
    "./images/door.png"
  );
}

addBlink(element){
  var blink_speed = 500; // every 1000 == 1 second, adjust to suit
  this.blinkIntervalId = setInterval(function () {
    element.style.visibility = (element.style.visibility == 'hidden' ? '' : 'hidden');
  }, blink_speed);
}

  stopAndAnimate(){
    this.enemyA.element.remove();

    this.enemyB = new Character(
      this.gameScreen,
      200,
      20,
      100,
      150,
      "./images/animationchef.gif"
    ); 
    //this.delayTimer();
  }

  delayTimer() {
    this.timeoutID = setTimeout(()=>{
      this.enemyB.element.style.display = "block";
      this.enemyA.element.style.display = "none";
    }, 2000);
  }

  update() {
    this.playEnd = false;
    this.playOnceBool = false;
    this.player.move();

    // enemy moves
    this.positionEnemy = this.enemyA.moveLinearRight();

    if(this.positionEnemy===200){
     // enemy animates
     this.stopAndAnimate();
    }
    
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
        let hearts = "";
        for(let i=0; i<this.lives; i++){
          hearts += "♥";
        }
        document.getElementById("lives").innerHTML = hearts;  
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }

      // If the lives are 0, end the game
      if (this.lives === 0) {
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
      // play sound on collecting token
      this.pickupMp3.play();
      this.token.element.remove();
      this.tokens += 1;
      let icon = document.createElement("img");
      icon.setAttribute("src", this.token.element.src);
      icon.setAttribute("height", this.token.height);
      icon.setAttribute("width", this.token.width);
      if(this.tokens === 1){
        document.getElementById("score").innerText = "";
      }
      document.getElementById("score").append(icon);
      this.tokenExists = false;
    }

    if(!this.doorExists && this.tokens===5){
     this.addDoor();
    }

    if(this.doorExists){
      if(this.player.exited(this.door)){
        const winner = true;
        this.exitMp3.play();
        this.endGame(winner);
      }
    }
  }
}