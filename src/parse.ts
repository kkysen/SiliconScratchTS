import {readFile} from "fs-extra";

export function parseString(input: string): unknown {
    return JSON.parse(input.replace(/\\b|\\u0008/g, ""));
}

export async function parseFile(path: string) {
    const buffer = await readFile(path);
    return parseString(buffer.toString());
}
