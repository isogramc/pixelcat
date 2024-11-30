class Game {
  constructor() {
    this.startScreen = document.getElementById("game-intro");
    this.gameScreen = document.getElementById("game-screen");
    this.gameEndScreen = document.getElementById("game-end");
    this.player = new Player(this.gameScreen,
      200,
      570,
      87,
      74,
      "./images/eris_rest.png"
    );
    this.obstacles = [];
    this.width = 500;
    this.height = 600;
    this.gameIsOver = false;
    this.score = 0;
    this.lives = 3;
    this.gameIntervalId;
    this.gameLoopFrequency = Math.round(1000 / 60); // 60fps
  }

  start() {
    // Set the height and width of the game screen
    this.gameScreen.style.height = `${this.height}px`;
    this.gameScreen.style.width = `${this.width}px`;

    this.startScreen.style.display = "none";
    this.gameScreen.style.display = "block";

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

  update() {//keep track of the different parts of the game update
    console.log("in the update");
    this.player.move();
  }

  // Create a new method responsible for ending the game
  endGame() {
    this.player.element.remove();
    this.obstacles.forEach((obstacle) => obstacle.element.remove());

    this.gameIsOver = true;

    // Hide game screen
    this.gameScreen.style.display = "none";
    // Show end game screen
    this.gameEndScreen.style.display = "block";
  }
}