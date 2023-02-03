// Sadly for now we must use window, but we can bypass that in a weird way.
var Crocodile = window.Crocodile;
// Not much we can do with hooking into the render loop but there it is.
Crocodile.Engine.hookRenderLoop = function() {
    debugger;
};