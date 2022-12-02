import * as fs from 'fs';

export class InputReader {
    static readFile(path: string): string {
        return fs.readFileSync(path, 'utf8');
    }
}