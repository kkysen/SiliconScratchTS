import {rust} from "./rust";
import {sb3} from "./sb3";

export function transformProject(project: sb3.Project): rust.Project {
    return rust.Project.of(project);
}

export function transformSprite(sprite: sb3.Sprite): rust.Sprite {
    return rust.Sprite.of(sprite);
}
