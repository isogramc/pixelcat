class Obstacle extends Component {
    constructor(gameScreen) {
        super(
            gameScreen,
            Math.floor(Math.random() * 300 + 70),
            0,
            100,
            150,
            "./images/pan.png"
          );
      }
    
      move() {
        // Move the obstacle down by 3px
        this.top += 3;
        // Update the obstacle's position on the screen
        this.updatePosition();
      }
}
