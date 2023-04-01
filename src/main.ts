import { Create } from "./components/Create";
import { Draw } from "./components/Draw";
import { Engine } from "./components/Engine";

export const Crocodile = {
    hook: Engine.hook,
    Engine: Engine,
    Create: Create,
    Draw: Draw
}

Crocodile.hook();