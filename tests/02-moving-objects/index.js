// Sadly for now we must use window, but we can bypass that in a weird way.
var Crocodile = window.Crocodile;
// Lets get an object to move!
let x = 0;
setInterval(function () {
    Crocodile.Draw.square("#FF0000", x, 0, 150, 75, true);
    x++;
},10)