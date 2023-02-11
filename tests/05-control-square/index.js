var Draw = Crocodile.Draw;
// Lets get an object to move!
var x = 1;
var speed = 4;
var y = 1;
var velY = 0;
var velX = 0;
var friction = 0.98;
var keys = [];

function update() {
    requestAnimationFrame(update)
    if (keys['w']) {
        if (velY > -speed) {
            velY--;
        }
    }
    
    if (keys['s']) {
        if (velY < speed) {
            velY++;
        }
    }
    if (keys['d']) {
        if (velX < speed) {
            velX++;
        }
    }
    if (keys['a']) {
        if (velX > -speed) {
            velX--;
        }
    }

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;


    Crocodile.Engine.clear();
    Draw.Square("#FF0000", x, y, 150, 75, true);
}
update();
document.body.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});