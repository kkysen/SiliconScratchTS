import { rust } from "./rust";
export function transformProject(project) {
    return rust.Project.of(project);
}
export function transformSprite(sprite) {
    return rust.Sprite.of(sprite);
}
