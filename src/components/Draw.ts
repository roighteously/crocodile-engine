import { RenderTypes } from "../helpers/RenderTypes";
import { Engine } from "./Engine";
import { renderer, Renderer } from "./Renderer";

export class draw {
    public image(img:any) {
        Renderer.addToRP({type:RenderTypes.IMAGE, args:[img]})
    }
    public square(color: string, x1: number, x2:number, w:number, h:number) {
        Renderer.addToRP({type:RenderTypes.SQUARE, color:color, x1:x1,x2:x2,w:w,h:h})
    }
}
export const Draw = new draw();