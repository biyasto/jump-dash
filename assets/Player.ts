
import { _decorator, Component, Collider2D, Contact2DType, IPhysics2DContact, systemEvent, SystemEventType, EventKeyboard, macro, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Player
 * DateTime = Wed Nov 17 2021 19:27:05 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Player.ts
 * FileBasenameNoExtension = Player
 * URL = db://assets/Player.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */

@ccclass('Player')
export class Player extends Component {
    isMoving: boolean;
    direction: number;
    // [1]
    // dummy = '';

    // [2]
    @property
    moveSpeed= 3000;
    @property
    maxDistant= 300;
    // @property
    // serializableDummy = 0;

    start () {

        // [3]
        let collider = this.getComponent(Collider2D);
        this.direction= -1;
        this.isMoving = false;

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

    }

    update (deltaTime: number) {
        // [4]
        if (this.isMoving == true) {
            let newPos = new Vec3(this.node.position.x + this.direction * this.moveSpeed * deltaTime, this.node.position.y, this.node.position.z);
            if(this.direction >= 0 ? newPos.x >= this.maxDistant : newPos.x <= -this.maxDistant) {
                this.isMoving = false;
                newPos = new Vec3(this.maxDistant * this.direction, this.node.position.y, this.node.position.z);
            }
            this.node.position = newPos;
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('Collider Contact');
        //director.loadScene("main");
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press A key');
                if (this.isMoving == false)
                {
                    this.direction*=-1;
                    this.isMoving = true;
                }
                break;
        }
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
