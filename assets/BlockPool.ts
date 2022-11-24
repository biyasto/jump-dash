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
import { GameManager } from "db://assets/GameManager";

@ccclass("BlockPool")
export class BlockPool extends Component {
    private static instance: BlockPool;
    timer: number;
    blockPool: NodePool;
    blockQueue: Queue<Node> = new Queue<Node>();
    barTimer: number;

    @property
    spawnTime = 3;
    @property
    barMinTime = 1;
    @property
    poolSize = 5;
    @property({ type: Prefab })
    blockPrefab: Prefab = null;

    start() {
        systemEvent.on(SystemEventType.KEY_DOWN, this.onKeyDown, this);

        this.timer = 0;
        this.barTimer = 0;
        this.blockPool = new NodePool();
        for (let i = 0; i < this.poolSize; ++i) {
            let block = instantiate(this.blockPrefab); // create node instance
            this.blockPool.put(block); // populate your pool with put method
        }
    }

    update(deltaTime: number) {
        if(GameManager.isOver) return;
        this.timer -= GameManager.gameSpeed * deltaTime;
        this.barTimer -= GameManager.gameSpeed * deltaTime;
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

        //chose between Square or Bar
        let isSquare = true;
        if(this.barTimer<0)
        {
            isSquare = false;
            this.barTimer=this.barMinTime;
        }

        block.getComponent("Block").init(isSquare);
        //console.log("spawned block");
    }
    despawnBlock() {
        if (this.blockQueue.size() > 0) {
            this.blockPool.put(this.blockQueue.dequeue()); // using the same put method as initializing node pool, this will also call removeFromParent for the node
            //console.log("despawned block");
        } else {
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
