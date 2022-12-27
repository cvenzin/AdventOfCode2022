export class Day10 {
    part1(input: string): number {
        const cycles = this.getCycles(input);
        const cyclesN = [20, 60, 100, 140, 180, 220];
        let result = 0;
        cyclesN.forEach(n => {
            const signalStrength = this.getSignalStrength(cycles, n);
            result += signalStrength;
        });
        return result;
    }

    part2(input: string): string {
        const cycles = this.getCycles(input);
        let result = '';
        for (let y = 0; y < 6; y++) {
            let line = '';
            for (let x = 0; x < 40; x++) {
                const index = y * 40 + x;
                const spritePosition = this.getX(cycles, index + 1);
                const wrappedIndex = index % 40;
                if (wrappedIndex - 1 <= spritePosition && wrappedIndex + 1 >= spritePosition) {
                    line += '#';
                } else {
                    line += '.';
                }
            }
            result += line + '\n';
        }
        return result;
    }

    private getCycles(input: string): number[] {
        const cycles: number[] = [];
        let cycle = 0;
        input.replaceAll('\r', '').split('\n').forEach(l => {
            const s = l.split(' ');
            if (s[0] === 'noop') {
                cycle++;
            } else if (s[0] === 'addx') {
                cycle += 2;
                if (!cycles[cycle]) {
                    cycles[cycle] = 0;
                }
                cycles[cycle] += Number(s[1]);
            }
        });
        return cycles;
    }

    private getSignalStrength(cycles: number[], cycle: number): number {
        return this.getX(cycles, cycle) * cycle;
    }

    private getX(cycles: number[], cycle: number): number {
        let x = 1;
        for (let i = 0; i < cycle; i++) {
            if (cycles[i]) {
                x += cycles[i];
            }
        }
        return x;
    }
}