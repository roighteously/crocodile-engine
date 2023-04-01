import { HTMLHelper } from "../HTMLHelper";
import DrawObject from "./DrawObject";

declare global {
    interface Window { Crocodile: any; }
}

class engine {
    public ticks: number = 0;
    public canvas: any = HTMLHelper.new("canvas", "croc-engine");
    public context: CanvasRenderingContext2D;
    public drawQueue: Array<DrawObject> = [];
    public hookRenderLoop: ()=>void = function () {};
    public renderLoop(hrl: void): void {
        this.context = this.canvas.getContext('2d');
        hrl;
        this.ticks++;
    }
    public clear() {
        this.drawQueue.splice(0, this.drawQueue.length)
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
    public start() {
        if(!HTMLHelper.id("croc-engine")) {
            this.canvas = HTMLHelper.new("canvas", "croc-engine");
            document.body.appendChild(this.canvas);
        }
        this.context = this.canvas.getContext('2d');
        setInterval(() => {
            this.renderLoop(this.hookRenderLoop());
        },10);
    }
    public hook() { window.Crocodile = this; window.Crocodile.Engine.start(); }
}

export const Engine = new engine();