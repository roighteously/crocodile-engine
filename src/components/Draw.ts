import { Engine } from "./Engine";
import DrawObject from "./DrawObject";

export class draw {
    public Image(obj: DrawObject) {
        let source = obj.source;
        let x = obj.x;
        let y = obj.y;
        let tempImg = document.createElement('img');
        tempImg.src = source;
        tempImg.onload = () => {
            Engine.context.drawImage(tempImg, x, y);
        }
    }
    public Square(obj: DrawObject) {
        Engine.context.fillStyle = obj.color;
        Engine.context.fillRect(obj.x, obj.y, obj.w, obj.h);
    }
    public Text(obj: DrawObject) {
        Engine.context.font = obj.font;
        Engine.context.fillStyle = "#000000";
        Engine.context.fillText(obj.content, obj.x, obj.y);
    }
    public Dialog(p1:string, p2:string, font:string) {
        this.Square({color:'#FF0000', x:500,y:500,w:750,h:100})
        this.Text({font:"48px serif", content:p1, x:500, y:500})
        this.Text({font:"24px serif", content:p2, x:500, y:525})
    }
}
export const Draw = new draw();