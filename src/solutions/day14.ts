export class Day14 {
    part1(input: string): number {
        const map = this.getMap(input);
        const maxY = Math.max(...Array.from(map).map(m => m.split(',').map(Number)[1]));
        let restedSandCount = 0;
        while (this.moveSand(500, 0, map, maxY, true)) {
            restedSandCount++;
        }
        return restedSandCount;
    }

    part2(input: string): number {
        const map = this.getMap(input);
        const maxY = Math.max(...Array.from(map).map(m => m.split(',').map(Number)[1]));
        let restedSandCount = 0;
        while (this.moveSand(500, 0, map, maxY + 1, false)) {
            restedSandCount++;
        }
        restedSandCount++;
        return restedSandCount;
    }

    private moveSand(x: number, y: number, map: Set<string>, maxY: number, abyss: boolean): boolean {
        if (y + 1 > maxY && abyss) {
            return false;
        }

        if (y + 1 > maxY && !abyss) {
            return true;
        }

        map.delete([x, y].toString());
        if (!map.has([x, y + 1].toString())) {
            map.add([x, y + 1].toString());
            return this.moveSand(x, y + 1, map, maxY, abyss);
        }

        if (!map.has([x - 1, y + 1].toString())) {
            map.add([x - 1, y + 1].toString());
            return this.moveSand(x - 1, y + 1, map, maxY, abyss);
        }

        if (!map.has([x + 1, y + 1].toString())) {
            map.add([x + 1, y + 1].toString());
            return this.moveSand(x + 1, y + 1, map, maxY, abyss);
        }

        if (x === 500 && y === 0) {
            return false;
        }

        map.add([x, y].toString());
        return true;
    }

    private getMap(input: string): Set<string> {
        const set = new Set<string>();
        const lines = input.replaceAll('\r', '').split('\n');
        lines.forEach(l => {
            const coords = l.split(' -> ').map(c => c.split(',').map(Number));
            for (let i = 0; i < coords.length - 1; i++) {
                const start = coords[i];
                const end = coords[i + 1];
                if (start[0] === end[0]) {
                    if (end[1] > start[1]) {
                        for (let j = start[1]; j <= end[1]; j++) {
                            set.add([start[0], j].toString());
                        }
                    }
                    if (end[1] < start[1]) {
                        for (let j = end[1]; j <= start[1]; j++) {
                            set.add([start[0], j].toString());
                        }
                    }
                }
                if (start[1] === end[1]) {
                    if (end[0] > start[0]) {
                        for (let j = start[0]; j <= end[0]; j++) {
                            set.add([j, start[1]].toString());
                        }
                    }
                    if (end[0] < start[0]) {
                        for (let j = end[0]; j <= start[0]; j++) {
                            set.add([j, start[1]].toString());
                        }
                    }
                }
            }
        });

        return set;
    }

    private printMap(map: Set<string>) {
        const rows: string[][] = [];
        let minX = Number.MAX_SAFE_INTEGER;
        let maxX = 0;
        for (const rock of map.values()) {
            const coord = rock.split(',').map(Number);
            if (!rows[coord[1]]) {
                rows[coord[1]] = [];
            }
            rows[coord[1]][coord[0]] = '#';
            if (minX > coord[0]) {
                minX = coord[0];
            }
            if (maxX < coord[0]) {
                maxX = coord[0];
            }
        }
        if (!rows[0]) {
            rows[0] = [];
        }
        rows[0][500] = '+';
        let text = '';
        for (let y = 0; y < rows.length; y++) {
            let line = '';
            for (let x = minX; x <= maxX; x++) {
                if (!rows[y]) {
                    line += '.';
                } else if (rows[y][x] === '+') {
                    line += '+';
                } else if (rows[y][x] === '#') {
                    line += '#';
                } else {
                    line += '.';
                }
            }
            text += line + '\n';
        }
        console.log(text);
    }
}