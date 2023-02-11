// Sadly for now we must use window, but we can bypass that in a weird way.
var Crocodile = window.Crocodile;
// Lets get an object to move!
let x = 0;
let y = 0;
setInterval(function () {
    Crocodile.Engine.clear();
    Crocodile.Draw.square("#FF0000", x, y, 150, 75, true);
    x++;
    y++;
    if(y == 50) {
        y --;
    }
},10)