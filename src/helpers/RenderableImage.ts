import { RenderTypes } from "./RenderTypes";

export interface RenderableImage {
    type: RenderTypes;
    source: any;
    dx: number;
    dy: number;
}