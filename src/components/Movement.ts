import { Engine } from "./Engine";

export class movement {
    public Image(source: string, x: number, y: number) {
        let tempImg = document.createElement('img');
        tempImg.src = source;
        tempImg.onload = () => {
            Engine.context.drawImage(tempImg, x, y);
        }
    }
    public Square(color: string, x1: number, x2:number, w:number, h:number) {
        Engine.context.fillStyle = color;
        Engine.context.fillRect(x1, x2, w, h);
    }
    public Text(font:string,c:string,x1:number,x2:number, moving:boolean=false) {
        Engine.context.font = font;
        Engine.context.fillStyle = "#000000";
        Engine.context.fillText(c, x1, x2);
    }
    public Dialog(p1:string, p2:string, font:string) {
        this.Square('#FF0000', 500,500,750,100)
        this.Text("48px serif", p1, 500, 500)
        this.Text("24px serif", p2, 500, 525)
    }
}
export const Movement = new movement();