import { Draw } from "./components/Draw";
import { Engine } from "./components/Engine";

export const Crocodile = {
    hook: Engine.hook,
    Engine: Engine,
    Draw: Draw
}

Crocodile.hook();