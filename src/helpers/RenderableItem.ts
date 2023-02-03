import { RenderTypes } from "./RenderTypes";

export interface RenderableItem {
    type: RenderTypes;
    color: string;
    source: any;
    x1: number;
    x2: number;
    w?: number;
    h?: number;
    x3?: number;
    x4?: number;
    dx?: number;
    dy?: number;
}