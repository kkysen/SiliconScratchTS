import {writeJson} from "fs-extra";
import {basename} from "path";
import {parseFile} from "./parse";
import {transformProject, transformSprite} from "./transform";
import {validateProject, validateSprite} from "./validate";

async function transform(input: unknown, path: string): Promise<object> {
    switch (basename(path)) {
        case "project.json":
            return transformProject(await validateProject(input));
        case "sprite.json":
            return transformSprite(await validateSprite(input));
        default:
            throw new Error("must be project.json or sprite.json");
    }
}

async function run(path: string) {
    const input = await parseFile(path);
    const output = transform(input, path);
    await writeJson(path, output);
}

export function main() {

}

main();
