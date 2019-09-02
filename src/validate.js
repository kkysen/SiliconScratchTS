var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { default as Ajv } from "ajv";
import { readJson } from "fs-extra";
const ajv = new Ajv();
function validate(input, isSprite) {
    return __awaiter(this, void 0, void 0, function* () {
        const version = 3;
        const definitionsFile = `sb${version}_definitions.json`;
        const schemaFile = `${isSprite ? "sprite" : "sb"}${version}_schema.json`;
        const [definitions, schema] = yield Promise.all([definitionsFile, schemaFile].map(file => readJson(file)));
        ajv.addSchema(definitions);
        const validate = yield ajv.compileAsync(schema);
        const isValid = yield validate(input);
        if (!isValid) {
            throw validate.errors;
        }
        return input;
    });
}
export function validateProject(input) {
    return validate(input, false);
}
export function validateSprite(input) {
    return validate(input, true);
}
