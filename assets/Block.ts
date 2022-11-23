import {
    _decorator,
    Component,
    Vec3
} from 'cc';

const { ccclass, property } = _decorator;
import {GameManager} from "db://assets/GameManager";

@ccclass('Block')
export class Block extends Component {

    @property
    speed = 200;

    public init () {
        this.node.position= new Vec3(100,0,0);
        this.node.scale = new Vec3(50,10,0)
    }

    update (deltaTime: number) {
        let newPos = new Vec3(this.node.position.x, this.node.position.y - GameManager.movingSpeed * deltaTime,this.node.position.z);
        this.node.position = newPos;

    }

}
