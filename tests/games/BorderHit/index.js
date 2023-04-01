// Lets get an object to move!
var x = 1;
var speed = 4;
var y = 1;
var velY = 0;
var velX = 0;
var friction = 0.9;
var keys = [];
var s = true;

function update() {
    requestAnimationFrame(update)
    if(x > Crocodile.Engine.canvas.width || y > Crocodile.Engine.canvas.height) {
        Crocodile.Draw.Dialog("BorderHIT", "You Lose :sob:")
        return
    }
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


    speed = 5;

    setTimeout(() => {friction = 1}, 50)
    setTimeout(() => {
        friction = 0.9;
    }, 100);

    y *= 1.004;

    velY *= friction;
    y += velY;
    velX *= friction;
    x += velX;
    

    Crocodile.Engine.clear();
    Crocodile.Create.Player({x, y, w:150, h:75, color:"#FF0000"});
    if(s) Crocodile.Draw.Dialog("BorderHIT", "Don't let your square hit the wall of the screen! Use WASD to avoid.");
}
setTimeout(() => {s = false},2500)
update();
document.body.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});