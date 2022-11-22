import {
    instantiate,
    _decorator,
    Component,
    Node,
    systemEvent,
    SystemEventType,
    EventKeyboard,
    macro,
} from "cc";
const { ccclass, property } = _decorator;
import { NodePool, Prefab } from "cc";
import { Block } from "db://assets/Block";
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

@ccclass("ObstaclePool")
export class ObstaclePool extends Component {
    private static instance: ObstaclePool;
    timer: number;
    blockPool: NodePool;
    blockQueue: Queue<Node> = new Queue<Node>();

    // [1]
    // dummy = '';

    // [2]
    @property
    spawnTime;
    @property
    poolSize;
    @property({ type: Prefab })
    blockPrefab: Prefab = null;

    // @property
    // serializableDummy = 0;

    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        this.timer = this.spawnTime;
        this.blockPool = new NodePool();
        for (let i = 0; i < this.poolSize; ++i) {
            let block = instantiate(this.blockPrefab); // create node instance
            this.blockPool.put(block); // populate your pool with put method
        }
    }

    update(deltaTime: number) {
        // [4]
        this.timer -= deltaTime;
        if (this.timer < 0) {
            this.timer = this.spawnTime;
            this.spawnBlock();
        }
    }

    spawnBlock() {
        let block = null;
        if (this.blockPool.size() <= 0) {
            this.despawnBlock();
        }

        block = this.blockPool.get();
        this.node.addChild(block);
        this.blockQueue.enqueue(block);
        block.getComponent("Block").init();
        console.log("spawned block");
    }
    despawnBlock() {
        if (this.blockQueue.size() > 0) {
            this.blockPool.put(this.blockQueue.dequeue()); // using the same put method as initializing node pool, this will also call removeFromParent for the node
            console.log("despawned block");
        }
        else{
            console.log("unable to despawne block");
        }
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case macro.KEY.b:
                console.log("Press B key");
        }
    }
}
interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}
class Queue<T> implements IQueue<T> {
    private storage: T[] = [];

    constructor(private capacity: number = Infinity) {}

    enqueue(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Queue has reached max capacity, you cannot add more items");
        }
        this.storage.push(item);
    }
    dequeue(): T | undefined {
        return this.storage.shift();
    }
    size(): number {
        return this.storage.length;
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
