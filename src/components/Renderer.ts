import { RenderableItem } from "../helpers/RenderableItem";
import { RenderTypes } from "../helpers/RenderTypes";
import { Engine } from "./Engine";

export class renderer {
    public renderQueue = [];
    private index = 0;
    public render() {
        this.renderQueue.forEach((item: RenderableItem) => {
            if(item.type == RenderTypes.IMAGE) {
                Engine.context.drawImage(item.source, item.dx, item.dy);
            }
            if(item.type == RenderTypes.SQUARE) {
                Engine.context.fillStyle = item.color;
                Engine.context.fillRect(item.x1, item.x2, item.w, item.h);
            }
            if(item.type == RenderTypes.TEXT) {
                Engine.context.font = item.font;
                Engine.context.fillText(item.content, item.x1, item.x2);
            }
        })
        
    }
    public addToRP(b) {this.renderQueue.push(b)}
}

export const Renderer = new renderer();