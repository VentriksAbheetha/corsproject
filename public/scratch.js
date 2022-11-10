import {add} from "./scratch2.js";
import {fileURLToPath} from "url";

export function test(){
    return add(5,6);
}

const __filename = fileURLToPath(import.meta.url);
console.log(__filename)