class Game {
  constructor() {
    this.startScreen = document.getElementById("logo-background");
    this.gameScreen = document.getElementById("game-screen");
    this.gameContainer = document.getElementById("game-container");
    this.gameEndScreen = document.getElementById("game-end");
    this.obstacles = [];
    this.width = 500;
    this.height = 600;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps

    this.player = new Player(this.gameScreen,
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
      "/images/chef_sml.png"
    );

    this.token = new Token(
      this.gameScreen,
      200,
      470,
      24,
      55,
      "./images/fish.png"
    );

    this.door = new Door(
      this.gameScreen,
      100,
      150,
      100,
      100,
      "./images/door.png"
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

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    this.gameContainer.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "flex";
  }

  update() {
    console.log("update");

    this.player.move();

    for (let i = 0; i < this.obstacles.length; i++) {
      const obstacle = this.obstacles[i];
      obstacle.move();
        // If the player's car collides with an obstacle
        if (this.player.didCollide(obstacle)) {
          // Remove the obstacle element from the DOM
          obstacle.element.remove();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Reduce player's lives by 1
          this.lives--;
          // Update the counter variable to account for the removed obstacle
          i--;
        } // If the obstacle is off the screen (at the bottom)
        else if (obstacle.top > this.height) {
          // Increase the score by 1
          this.score++;
          document.getElementById("score").innerHTML = this.score;
          // Remove the obstacle from the DOM
          obstacle.element.remove();
          // Remove obstacle object from the array
          this.obstacles.splice(i, 1);
          // Update the counter variable to account for the removed obstacle
          i--;
        }
        document.getElementById("lives").innerHTML = this.lives;
        document.getElementById("score").innerHTML = this.score;
  
      
    }

    // If the lives are 0, end the game
    if (this.lives === 0) {
      this.endGame();
    }

    // Create a new obstacle based on a random probability
    // when there is no other obstacles on the screen
    if (Math.random() > 0.98 && this.obstacles.length < 1) {
      this.obstacles.push(new Obstacle(this.gameScreen));
    }


  }
}