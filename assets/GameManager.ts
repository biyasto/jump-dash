import {
    Label,
    _decorator,
    Component,
    Sprite,
    color,
    director,
    Button,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    static gameSpeed: number;
    static gameScore: number;
    static movingSpeed: number;
    static isOver: boolean;

    @property(Button) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    restartButton: Button = null;
    @property(Label) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    scoreLabel: Label = null;
    @property(Label) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    highScoreLabel: Label = null;
    @property(Sprite) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    background: Sprite = null;
    @property
    serializeStartSpeed= 200;
    @property
    serializePlayerStartSpeed = 3000;
    @property
    serializeMaxDistant= 150;

    static startSpeed;
    static playerSpeed;
    static maxDistant;
    static highScore;
    colors = [color(37,138,37), color(153,0,153), color(153,76,0), color(102,204,0)];



    start() {

        this.background.color=this.randomColor();
        GameManager.startSpeed=this.serializeStartSpeed;
        GameManager.playerSpeed=this.serializePlayerStartSpeed;
        GameManager.maxDistant=this.serializeMaxDistant;

        GameManager.gameSpeed = 1;
        GameManager.gameScore = 0;
        GameManager.movingSpeed = GameManager.startSpeed;

        GameManager.isOver =false;
    }
    restart()
    {
        director.loadScene("main");
    }

    static increaseSpeed(per) {
        GameManager.gameSpeed += per;
        this.movingSpeed = this.gameSpeed * this.startSpeed;
    }
    static increaseScore(point) {
        GameManager.gameScore += point;
        //console.log(GameManager.gameScore);
        if(GameManager.highScore == null || GameManager.gameScore>GameManager.highScore)
            GameManager.highScore= GameManager.gameScore;

    }
    update(deltaTime: number) {
        if(GameManager.isOver) {
            this.restartButton.node.active=true;

        };
        GameManager.increaseSpeed(0.05 * deltaTime);
        this.scoreLabel.string = GameManager.gameScore.toString();
        this.highScoreLabel.string = 'best:' +GameManager.highScore.toString();
    }
    randomColor()
    {
        const random = Math.floor(Math.random() * color.length);
        return this.colors[random];
    }


}

