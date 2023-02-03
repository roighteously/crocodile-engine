import { RenderTypes } from "../helpers/RenderTypes";
import { Engine } from "./Engine";
import { Renderer } from "./Renderer";

export class image {
    public draw(img:any) {
        Renderer.addToRP({type:RenderTypes.IMAGE, args:[img]})
    }
}
export const Image = new image();