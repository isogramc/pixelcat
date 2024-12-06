class Token extends Component{
    constructor(gameScreen, left, top, width, height, imgSrc){
        super(gameScreen, left, top, width, height, imgSrc);
    }

    removeToken(){
        this.gameScreen.removeChild(this.element);
    }

}