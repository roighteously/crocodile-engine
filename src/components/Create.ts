import { Engine } from "./Engine";
import DrawObject from "./DrawObject";
import { Player } from "./Player";

export class create {
    public Player(obj: DrawObject) {
        return new Player({ x:obj.x,y:obj.y,w:obj.w,h:obj.h, color:obj.color });
    }
}
export const Create = new create();