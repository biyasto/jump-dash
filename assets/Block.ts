import {
    _decorator,
    Component,
    Vec3
} from 'cc';
import {ObstaclePool} from "db://assets/ObstaclePool";

const { ccclass } = _decorator;

/**
 * Predefined variables
 * Name = Block
 * DateTime = Wed Nov 17 2021 19:43:42 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Block.ts
 * FileBasenameNoExtension = Block
 * URL = db://assets/Block.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Block')
export class Block extends Component {
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;
    owner: ObstaclePool;


    public init () {
        this.node.position= new Vec3(100,0,0);
    }

    update (deltaTime: number) {
        // [4]
        let newPos = new Vec3(this.node.position.x, this.node.position.y - 150 * deltaTime,this.node.position.z);
        this.node.position = newPos;
    }

}

/**
 * [1] Class member could be defined like this.
 * [2] Use `property` decorator if your want the member to be serializable.
 * [3] Your initialization goes here.
 * [4] Your update function goes here.
 *
 * Learn more about scripting: https://docs.cocos.com/creator/3.3/manual/en/scripting/
 * Learn more about CCClass: https://docs.cocos.com/creator/3.3/manual/en/scripting/ccclass.html
 * Learn more about life-cycle callbacks: https://docs.cocos.com/creator/3.3/manual/en/scripting/life-cycle-callbacks.html
 */
