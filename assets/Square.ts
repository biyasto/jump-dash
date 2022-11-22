
import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, director, systemEvent, SystemEventType, EventKeyboard, macro, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

/**
 * Predefined variables
 * Name = Square
 * DateTime = Wed Nov 17 2021 19:27:05 GMT+0700 (Indochina Time)
 * Author = khaccanh
 * FileBasename = Square.ts
 * FileBasenameNoExtension = Square
 * URL = db://assets/Square.ts
 * ManualUrl = https://docs.cocos.com/creator/3.3/manual/en/
 *
 */
 
@ccclass('Square')
export class Square extends Component {
    moveRight: boolean;
    moving: boolean;
    // [1]
    // dummy = '';

    // [2]
    // @property
    // serializableDummy = 0;

    start () {
        // [3]
        let collider = this.getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        }

        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);
        this.moveRight = true;
        this.moving = false;
    }

    update (deltaTime: number) {
    //     // [4]
        if (this.moving == true)
        {
            if (this.moveRight == true)
            {
                let viTriMoi = new Vec3(this.node.position.x + 2000 * deltaTime, this.node.position.y,this.node.position.z);
                if (viTriMoi.x > 200)
                {
                    this.moving = false;
                }
                this.node.position = viTriMoi;
            }
            else
            {
                let viTriMoi = new Vec3(this.node.position.x - 2000 * deltaTime, this.node.position.y,this.node.position.z);
                if (viTriMoi.x < -200)
                {
                    this.moving = false;
                }
                this.node.position = viTriMoi;
            }
        }

    }

    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // will be called once when two colliders begin to contact
        console.log('onBeginContact--------');
        director.loadScene("main");
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case macro.KEY.a:
                console.log('Press a key');
                if (this.moving == false)
                {
                    if (this.moveRight == true)
                    {
                        this.moveRight = false;
                        this.moving = true;
                    }
                    else
                    {
                        this.moveRight = true;
                        this.moving = true;
                    }
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
