class Sound{
    constructor(src){
        this.snd = document.createElement("audio");
        this.snd.src = src;
    } 
    play(){
        this.snd.volume = 0.5;
        this.snd.play();
    }

    stop(){
        this.snd.pause();
        this.snd.currentTime = 0;
    }
}