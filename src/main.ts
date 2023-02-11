import { Draw } from "./components/Draw";
import { Engine } from "./components/Engine";
import { Renderer } from "./components/Renderer";

export const Crocodile = {
    hook: Engine.hook,
    Engine: Engine,
    Renderer: Renderer,
    Draw: Draw
}

Crocodile.hook();