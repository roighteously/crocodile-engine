import { RenderTypes } from "../helpers/RenderTypes";
import { Engine } from "./Engine";
import { Renderer } from "./Renderer";

export class draw {
    public image(img:any, moving:boolean=false) {
        Renderer.addToRP({type:RenderTypes.IMAGE, args:[img],moving:moving})
    }
    public square(color: string, x1: number, x2:number, w:number, h:number, moving:boolean=false) {
        Renderer.addToRP({type:RenderTypes.SQUARE, color:color, x1:x1,x2:x2,w:w,h:h,moving:moving})
    }
    public text(font:string,c:string,x1:number,x2:number, moving:boolean=false) {
        Renderer.addToRP({type:RenderTypes.TEXT,content:c,font:font,x1:x1,x2:x2,moving:moving})
    }
}
export const Draw = new draw();