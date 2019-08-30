import {default as Ajv, ErrorObject} from "ajv";
import {readJson} from "fs-extra";
import {sb3} from "./sb3";

const ajv = new Ajv();

async function validate<T>(input: unknown, isSprite: boolean): Promise<T> {
    const version = 3;
    const definitionsFile = `sb${version}_definitions.json`;
    const schemaFile = `${isSprite ? "sprite" : "sb"}${version}_schema.json`;
    const [definitions, schema] = await Promise.all(
        [definitionsFile, schemaFile].map(file => readJson(file))
    );
    
    ajv.addSchema(definitions);
    const validate = await ajv.compileAsync(schema);
    const isValid = await validate(input);
    if (!isValid) {
        throw validate.errors as ErrorObject[];
    }
    return input as T;
}

export function validateProject(input: unknown) {
    return validate<sb3.Project>(input, false);
}

export function validateSprite(input: unknown) {
    return validate<sb3.Sprite>(input, true);
}
