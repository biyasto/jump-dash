
import { _decorator, Component, Collider2D, Contact2DType,director, IPhysics2DContact, systemEvent, SystemEventType, EventKeyboard, macro, Vec3 } from 'cc';
import {GameManager} from "db://assets/GameManager";
const { ccclass, property } = _decorator;

@ccclass('Player')
export class Player extends Component {
    isMoving: boolean;
    direction: number;

    start () {

        let collider = this.getComponent(Collider2D);
        this.direction= -1;
        this.isMoving = false;

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        systemEvent.on(SystemEventType.TOUCH_START, this.onTouchStart, this);

    }

    update (deltaTime: number) {
        if(GameManager.isOver) return;
        if (this.isMoving == true) {
            let newPos = new Vec3(this.node.position.x + this.direction * GameManager.playerSpeed * deltaTime, this.node.position.y, this.node.position.z);
            if(this.direction >= 0 ? newPos.x >= GameManager.maxDistant : newPos.x <= -GameManager.maxDistant) {
                this.isMoving = false;
                newPos = new Vec3(GameManager.maxDistant * this.direction, this.node.position.y, this.node.position.z);
                GameManager.increaseScore(1);
            }
            this.node.position = newPos;
        }
    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('Collider Contact');
        GameManager.isOver=true;
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press A key');
                this.onTouchStart()
        }
    }
    onTouchStart ()
    {
        if (this.isMoving == false)
        {
            this.direction*=-1;
            this.isMoving = true;
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
