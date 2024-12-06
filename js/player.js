class Player extends Character{
    constructor(gameScreen, left, top, width, height, imgSrc) {
      super(gameScreen, left, top, width, height, imgSrc);
    }

    move() {
      this.start = this.left;
      // Update player position based on directionX and directionY
      this.left += this.directionX;
      this.top += this.directionY;
  
      // Ensure the player stays within the game screen
      // handles left hand side
      if (this.left < 10) {
        this.left = 10;
      }
  
      // handles top side
      if (this.top < 10) {
        this.top = 10;
      }
  
      // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 10) {
        this.left = this.gameScreen.offsetWidth - this.width - 10;
      }
  
      // handles bottom side
      if (this.top > this.gameScreen.offsetHeight - this.height - 10) {
        this.top = this.gameScreen.offsetHeight - this.height - 10;
      }
  
      // Update the player position on the screen
      this.updatePosition();
    }
  

      didCollide(obstacle) {
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.element.getBoundingClientRect();
    
        if (
          playerRect.left < obstacleRect.right &&
          playerRect.right > obstacleRect.left &&
          playerRect.top < obstacleRect.bottom &&
          playerRect.bottom > obstacleRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }

      didCollideToken(token) {
        const playerRect = this.element.getBoundingClientRect();
        const tokenRect = token.element.getBoundingClientRect();
        // console.log(tokenRect);
        if (
          playerRect.left < tokenRect.right &&
          playerRect.right > tokenRect.left &&
          playerRect.top < tokenRect.bottom &&
          playerRect.bottom > tokenRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }

      exited(door){
        if(door===undefined){
          return;
        }
        const playerRect = this.element.getBoundingClientRect();
        const doorRect = door.element.getBoundingClientRect();
        // console.log(doorRect);
        if (
          playerRect.left < doorRect.right &&
          playerRect.right > doorRect.left &&
          playerRect.top < doorRect.bottom &&
          playerRect.bottom > doorRect.top
        ) {
          return true;
        } else {
          return false;
        }
      }
}