import { HTMLHelper } from "./HTMLHelper";

declare global {
    interface Window { CrocodileEngine: any; }
}

class engine {
    public ticks: number = 0;
    private canvas;
    public renderLoop(): void {
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