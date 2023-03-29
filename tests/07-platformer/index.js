// Lets get an object to move!
var x = 250;
var speed = 4;
var y = 250;
var velY = 0;
var velX = 0;
var friction = 0.98;
var jumpYLimit = -100;
var jumpY = -1;
var keys = [];
var jumping = false;
var platforms = [[1, 105]]
var objT = ["Objective", "make the platform float [go up] (this is intended not a bug at all i poromise)","Win", "you win: da block is floatin!"]
var oi = 0;

function update() {
    requestAnimationFrame(update)
    COLLISION_PHYSICCCCCCCCCCCS();
    if (jumping) jumpY = y - 250;
    console.log(y-250)
    if (y-250 < -188) oi = 2
    if (keys['w'] && !jumping && jumpY > jumpYLimit) {
        jumping = true
        if (velY > -speed) {
            velY = velY + -4;
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

    JUUMP();
    Crocodile.Engine.clear();
    Crocodile.Draw.Square({ color: "#FF0000", x, y, w: 150, h: 75 });
    // 0 "t", "m"
    Crocodile.Draw.Dialog(objT[oi], objT[oi+1]);
    drawPlatforms();
}
update();
function JUUMP() {
    if (jumping == true) {
        setTimeout(function () {
            if (jumpY > jumpYLimit) {
                velY = velY + 4;
            }
            jumping = false
        }, 150)
    }
}
function COLLISION_PHYSICCCCCCCCCCCS() {
    platforms.forEach(plf => {
        if(plf[1] == y && plf[0] == x) {
            return;
        }
    })
}
function drawPlatforms() {
    platforms.forEach(coordmap => {
        Crocodile.Draw.Square({ color: "#0000FF", x: coordmap[0], y: coordmap[1], w: 100, h: 25 })
    })
}
document.body.addEventListener("keydown", function (e) {
    keys[e.key] = true;
});
document.body.addEventListener("keyup", function (e) {
    keys[e.key] = false;
});