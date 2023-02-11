import { RenderTypes } from "../helpers/RenderTypes";
import { Engine } from "./Engine";

export class draw {
    public image(img:any, moving:boolean=false) {}
    public square(color: string, x1: number, x2:number, w:number, h:number) {
        Engine.context.fillStyle = color;
        Engine.context.fillRect(x1, x2, w, h);
    }
    public text(font:string,c:string,x1:number,x2:number, moving:boolean=false) {
        Engine.context.font = font;
        Engine.context.fillText(c, x1, x2);
    }
}
export const Draw = new draw();