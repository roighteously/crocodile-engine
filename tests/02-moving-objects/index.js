// Lets get an object to move!
let x = 0;
let y = 0;
setInterval(function () {
    Crocodile.Engine.clear();
    Crocodile.Draw.Square("#FF0000", x, y, 150, 75, true);
    x++;
    y++;
    if(y == 50) {
        y --;
    }
},10)