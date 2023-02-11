import { HTMLHelper } from "../helpers/HTMLHelper";
import { RenderableItem } from "../helpers/RenderableItem";
import { RenderTypes } from "../helpers/RenderTypes";
import { Renderer } from "./Renderer";

declare global {
    interface Window { Crocodile: any; }
}

class engine {
    public ticks: number = 0;
    public canvas: any = HTMLHelper.new("canvas", "croc-engine");
    public context: CanvasRenderingContext2D;
    public hookRenderLoop: ()=>void = function () {};
    public renderLoop(hrl: void): void {
        this.context = this.canvas.getContext('2d');
        this.context.clearRect(0,0,this.canvas.width,this.canvas.height)
        hrl;
        Renderer.render();
        this.ticks++;
    }
    public start() {
        if(!HTMLHelper.id("croc-engine")) {
            this.canvas = HTMLHelper.new("canvas", "croc-engine");
            document.body.appendChild(this.canvas);
        }
        this.context = this.canvas.getContext('2d');
        setInterval(() => {
            this.renderLoop(this.hookRenderLoop());
            var lastRPi: RenderableItem = {type:RenderTypes.SQUARE, color:"#FF0000", source:"", x1:-1,x2:-1, w:-1,h:-1};
            Renderer.renderQueue.forEach((rpi) => {
                if(lastRPi.w == rpi.w) {
                    var idx = Renderer.renderQueue.indexOf(lastRPi);
                    Renderer.renderQueue.splice(idx, 1);
                }
                lastRPi = rpi;
            })
        },10);
        
    }
    public clearScreen() { this.context.clearRect(0,0,this.canvas.width,this.canvas.height); }
    public hook() { window.Crocodile = this; window.Crocodile.Engine.start(); }
}

export const Engine = new engine();