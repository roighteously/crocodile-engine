import { HTMLHelper } from "./HTMLHelper";
import { Renderer } from "./Renderer";

declare global {
    interface Window { CrocodileEngine: any; }
}

class engine {
    public ticks: number = 0;
    public canvas: any = HTMLHelper.new("canvas", "croc-engine");
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');
    public renderLoop(): void {
        Renderer.render();
        this.ticks++;
    }
    public start() {
        if(!HTMLHelper.id("croc-engine")) {
            this.canvas = HTMLHelper.new("canvas", "croc-engine");
            document.body.appendChild(this.canvas);
        }
        console.log("Vroom. Get it? It's like an engine.")
        setInterval(() => {
            this.renderLoop();
        },30);
    }
    public hook() { window.CrocodileEngine = this; window.CrocodileEngine.Engine.start(); }
}

export const Engine = new engine();