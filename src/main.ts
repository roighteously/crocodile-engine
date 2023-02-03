import { Engine } from "./components/Engine";

export const CrocodileEngine = {
    hook: Engine.hook,
    Engine: Engine
}

CrocodileEngine.hook();