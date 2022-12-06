export class Day06 {

    part1(input: string): number {
        return this.findMarker(input, 4);
    }

    part2(input: string): number {
        return this.findMarker(input, 14);
    }

    private findMarker(input: string, distinctCharacterCount: number): number {
        for (let i = 0; i < input.length; i++) {
            if (new Set(input.slice(i, i + distinctCharacterCount).split('')).size === distinctCharacterCount) {
                return i + distinctCharacterCount;
            }
        }

        return -1;
    }
}