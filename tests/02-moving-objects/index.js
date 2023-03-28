// Lets get an object to move!
let x = 0;
let y = 0;
setInterval(function () {
    Crocodile.Engine.clear();
    Crocodile.Draw.Square({color: "#FF0000", x, y, w:150, h:75});
    x++;
    y++;
    if(y == 50) {
        y --;
    }
},10)