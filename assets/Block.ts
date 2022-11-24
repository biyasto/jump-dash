import {
    _decorator,
    Component,
    Vec3
} from 'cc';

const { ccclass, property } = _decorator;
import {GameManager} from "db://assets/GameManager";

@ccclass('Block')
export class Block extends Component {

    public init(isSquare: boolean) {

        let horizontalPos = 0;
        if(isSquare){ // square

            this.node.scale = new Vec3(10,10,0) //default scale value
            horizontalPos = 50 * Math.floor(Math.random() * (GameManager.maxDistant/50 * 2 + 1) - GameManager.maxDistant/50)
        }
        else{ // bar
            let minMultiply = 2,maxMultiply = 6;
            let sizeMultiply = Math.floor(Math.random() * (maxMultiply - minMultiply + 1) + minMultiply);
            this.node.scale = new Vec3( 10*sizeMultiply,10,0)

            horizontalPos = - GameManager.maxDistant + (sizeMultiply-1) * 50/2;

            let side = Math.floor(Math.random()*2) ; // 0 = left ,1 = right
            if(side == 1) horizontalPos*=-1;

        }
        this.node.position = new Vec3(horizontalPos,0,0);
    }



    update (deltaTime: number) {
        if(GameManager.isOver) return;
        let newPos = new Vec3(this.node.position.x, this.node.position.y - GameManager.movingSpeed * deltaTime,this.node.position.z);
        this.node.position = newPos;

    }

}
