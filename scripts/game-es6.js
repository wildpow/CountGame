class NumberedBox extends createjs.Container {
    constructor(game, number = 0) {
        super();

        this.game = game;
        this.number = number;

        var movieclip = new lib.NumberedBox();
        movieclip.numberText.text = number;
        this.addChild(movieclip);

        this.setBounds(0, 0, 50, 50);

        this.on('click', this.handleClick.bind(this));
    }
    handleClick() {
        this.game.handleClick(this);
    }
}

// This class handles the game data
class GameData {
    constructor() {
        this.amountOfBox = 20;
        this.resetData();
    }
    resetData() {
        this.currentNumber = 1;
    }
    nextNumber() {
        this.currentNumber += 1;
    }
    isRightNumber(number) {
        return (number === this.currentNumber);
    }
    isGameWin() {
        //todo
        return false;
    }
}

// Logic for the Count game
class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);
        
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        // tap or touch
        createjs.Touch.enable(this.stage);
        
        // enable retina
        this.retinalize();

        // createjs.Ticker.setFPS(60);
        
        createjs.Ticker.framerate = 60;

        // game related 
        this.gameData = new GameData();

        // keep re-drawing the stage.
        createjs.Ticker.on("tick", this.stage);

        // background
        this.stage.addChild(new lib.Background());

        this.generateMultipleBoxes();
    }
    version() {
        return '1.0.0';
    }
    generateMultipleBoxes(amount=10) {
        for (var i = amount; i > 0; i--) {
            var movieclip = new NumberedBox(this, i);
            this.stage.addChild(movieclip);

            // random position
            movieclip.x = Math.random() * (this.stage.width - movieclip.getBounds().width);
            movieclip.y = Math.random() * (this.stage.height - movieclip.getBounds().height);
        }
    }
    handleClick(numberedBox) {
        if (this.gameData.isRightNumber(numberedBox.number)) {
            this.stage.removeChild(numberedBox);
            this.gameData.nextNumber();
        }
        
    }
    retinalize() {
        this.stage.width = this.canvas.width;
        this.stage.height = this.canvas.height;

        let ratio = window.devicePixelRatio;
        if (ratio === undefined) {
            return;
        }

        this.canvas.setAttribute('width', Math.round( this.stage.width * ratio));
        this.canvas.setAttribute('height', Math.round( this.stage.height * ratio));

        this.stage.scaleX = this.stage.scaleY = ratio;

        this.canvas.style.width = this.stage.width + "px";
        this.canvas.style.height = this.stage.height + "px";
    }
}

// start the game
var game = new Game();