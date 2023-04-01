import { Draw } from "./Draw";
import DrawObject from "./DrawObject";
import { Engine } from "./Engine";

export class Player {
    private pid;
    public x;
    public y;
    public w;
    public h;
    constructor(obj: DrawObject) {
        this.x = obj.x;
        this.y = obj.y;
        this.w = obj.w;
        this.h = obj.h;
        this.pid = Math.random().toString().substring(2,5);
        Draw.Square({x:this.x, y:this.y, w:this.w, h:this.h, color: obj.color});
        Engine.drawQueue.push(obj);
        return this;
    }
}