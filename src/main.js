var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { writeJson } from "fs-extra";
import { basename } from "path";
import { parseFile } from "./parse";
import { transformProject, transformSprite } from "./transform";
import { validateProject, validateSprite } from "./validate";
function transform(input, path) {
    return __awaiter(this, void 0, void 0, function* () {
        switch (basename(path)) {
            case "project.json":
                return transformProject(yield validateProject(input));
            case "sprite.json":
                return transformSprite(yield validateSprite(input));
            default:
                throw new Error("must be project.json or sprite.json");
        }
    });
}
function run(path) {
    return __awaiter(this, void 0, void 0, function* () {
        const input = yield parseFile(path);
        const output = transform(input, path);
        yield writeJson(path, output);
    });
}
export function main() {
}
main();
