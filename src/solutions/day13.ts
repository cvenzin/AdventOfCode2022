export class Day13 {
    part1(input: string): number {
        const pairs = this.getPairs(input);
        const pairsInRightOrder = this.getPairsInRightOrder(pairs);
        return pairsInRightOrder.map(p => p.index).reduce((a, b) => a + b);
    }

    part2(input: string): number {
        const pairs = this.getPairs(input);
        const packets: (number | number[])[][] = [];
        pairs.forEach(p => {
            packets.push(p.line1);
            packets.push(p.line2);
        });
        packets.push([[2]]);
        packets.push([[6]]);
        packets.sort((a, b) => {
            const checkResult = this.check(a, b);
            if (checkResult === true) {
                return -1;
            }
            if (checkResult === false) {
                return 1;
            }
            return 0;
        });
        const index1 = packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[2]]));
        const index2 = packets.findIndex(p => JSON.stringify(p) === JSON.stringify([[6]]));
        return (index1 + 1) * (index2 + 1);
    }

    private getPairsInRightOrder(pairs: Pair[]): Pair[] {
        const result: Pair[] = [];
        for (const pair of pairs) {
            if (this.isPairInRightOrder(pair)) {
                result.push(pair);
            }
        }
        return result;
    }

    private isPairInRightOrder(pair: Pair): boolean {
        if (this.check(pair.line1, pair.line2)) {
            return true;
        }
        return false;
    }

    private check(v1: number | (number | number[])[], v2: number | (number | number[])[]): boolean | null {

        if (typeof v1 === 'number' && typeof v2 === 'number') {
            if (v1 < v2) {
                return true;
            }
            if (v1 > v2) {
                return false;
            }
            if (v1 === v2) {
                return null;
            }
        }

        if (Array.isArray(v1) && Array.isArray(v2)) {
            for (let i = 0; i < v1.length; i++) {
                if (v2[i] === undefined) {
                    return false;
                }
                const checkResult = this.check(v1[i], v2[i]);
                if (checkResult === true) {
                    return true;
                }
                if (checkResult === false) {
                    return false;
                }
                if (checkResult === null) {
                    continue;
                }
            }
            if (v1.length !== v2.length) {
                return true;
            }
            return null;
        }

        if (Array.isArray(v1) && typeof v2 === 'number') {
            return this.check(v1, [v2]);
        }

        if (typeof v1 === 'number' && Array.isArray(v2)) {
            return this.check([v1], v2);
        }

        return null;
    }

    private getPairs(input: string): Pair[] {
        const lines = input.replaceAll('\r', '').split('\n');
        const pairs: Pair[] = [];
        for (let i = 0; i < lines.length; i += 3) {
            const pair: Pair = {
                index: Math.floor(i / 3) + 1,
                line1: JSON.parse(lines[i]),
                line2: JSON.parse(lines[i + 1])
            };
            pairs.push(pair);
        }
        return pairs;
    }
}

interface Pair {
    index: number;
    line1: (number | number[])[];
    line2: (number | number[])[];
}
