class Character extends Component{
    constructor(gameScreen, left, top, width, height, imgSrc) {
       
        super(gameScreen, left, top, width, height, imgSrc);
        
        this.directionX = 0;
        this.directionY = 0;
      }

      flipElement(){
        this.element.classList.add("direction-flip");
      }
  
      reverseFlip(){
        this.element.classList.remove("direction-flip");
      }

      hideTopElement(){
        this.element.classlist.add("show");
      }

      hideBottomElement(){
        this.element.classList.add("hide");
      }

      moveLinearRight() {
        // Move the character right
        this.left += 1;

         // handles right hand side
      if (this.left > this.gameScreen.offsetWidth - this.width - 150) {
        this.left = this.gameScreen.offsetWidth - this.width - 150;
      }
        // Update the obstacle's position on the screen
        this.updatePosition();

        return this.left;
      }

      moveLinearLeft() {
        // Move the character left
        this.left -= 1;
        // Update the obstacle's position on the screen

        if (this.left < 10) {
          this.left = 10;
        }

        this.updatePosition();

        return this.left;
      }
   

      updatePosition() {
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
      }
     

}