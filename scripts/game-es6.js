class NumberedBox extends createjs.Container {
    constructor(number = 0) {
        super();

        var movieclip = new lib.NumberedBox();
        movieclip.numberText.text = number;
        this.addChild(movieclip);

        // random position
        movieclip.x = Math.random() * 200;
        movieclip.y = Math.random() * 200;
    }
}

// Logic for the Count game
class Game {
    constructor() {
        console.log(`Welcome to the game. Version ${this.version()}`);

        this.canvas = document.getElementById("game-canvas");
        this.stage = new createjs.Stage(this.canvas);

        createjs.Ticker.framerate = 60;

        // keep re-drawing the stage.
        createjs.Ticker.on("tick", this.stage);

        // testing code
        var circle = new createjs.Shape();
        circle.graphics.beginFill("yellow").drawCircle(0,0,40);
        circle.x = circle.y = 100;
        this.stage.addChild(circle);
    }
    version() {
        return '1.0.0';
    }
}

// start the game
var game = new Game();