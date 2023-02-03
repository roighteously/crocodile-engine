import { RenderTypes } from "../helpers/RenderTypes";
import { RenderableImage } from "../helpers/RenderableImage";
import { Engine } from "./Engine";

export class renderer {
    private renderQueue = [];
    public render() {
        this.renderQueue.forEach((item: RenderableImage) => {
            if(item.type == RenderTypes.IMAGE) {
                Engine.context.drawImage(item.source, item.dx, item.dy);
            }
        })
    }
    public addToRP(b) {this.renderQueue.push(b)}
}

export const Renderer = new renderer();