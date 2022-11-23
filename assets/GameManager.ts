import {
    Label,
    _decorator,
    Component,
    Collider2D,
    Contact2DType,
    director,
    IPhysics2DContact,
    systemEvent,
    SystemEventType,
    EventKeyboard,
    macro,
    Vec3,
} from "cc";
const { ccclass, property } = _decorator;

@ccclass("GameManager")
export class GameManager extends Component {
    static gameSpeed: number;
    static gameScore: number;
    static movingSpeed: number;

    @property(Label) // use property decorator to declare attributes, parentheses are attribute types, decorator type declaration is mainly used for editor display
    scoreLabel: Label = null;
    @property
    static startSpeed = 200;

    start() {
        GameManager.gameSpeed = 1;
        GameManager.gameScore = 0;
        GameManager.movingSpeed = GameManager.startSpeed;
    }

    static increaseSpeed(per) {
        GameManager.gameSpeed += per;
        this.movingSpeed = this.gameSpeed * this.startSpeed;
    }
    static increaseScore(point) {
        GameManager.gameScore += point;
        console.log(GameManager.gameScore);
    }
    update(deltaTime: number) {
        GameManager.increaseSpeed(0.05 * deltaTime);
        this.scoreLabel.string = GameManager.gameScore.toString();
    }
}

