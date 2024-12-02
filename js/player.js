class Player {
    constructor(gameScreen, left, top, width, height, imgSrc) {
        this.gameScreen = gameScreen;
        this.left = left;
        this.top = top;
        this.width = width;
        this.height = height;
        this.directionX = 0;
        this.directionY = 0;
        this.element = document.createElement("img");
    
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        // Set up the default element's property values
        this.element.style.width = `${width}px`;
        this.element.style.height = `${height}px`;
        this.start = 0;
        this.element.style.left = `${left}px`;
        this.element.style.top = `${top}px`;
    
        this.gameScreen.appendChild(this.element);
    }

    flipElement(){
      this.element.classList.add("direction-flip");
    }

    reverseFlip(){
      this.element.classList.remove("direction-flip");
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
    
      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
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
        console.log(tokenRect);
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
        const playerRect = this.element.getBoundingClientRect();
        const doorRect = door.element.getBoundingClientRect();
        console.log(doorRect);
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