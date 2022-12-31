export class Day18 {
    part1(input: string): number {
        const cubes = this.getCubes(input);
        let count = 0;
        for (const cube of cubes.values()) {
            const [x, y, z] = cube.split(',').map(Number);
            [x, y, z].forEach((v, i) => {
                for (let j = v - 1; j <= v + 1; j++) {
                    const key = [x, y, z];
                    key[i] = j;
                    if (!cubes.has(key.toString())) {
                        count++;
                    }
                }
            });
        }
        return count;
    }

    part2(input: string): number {
        const cubes = this.getCubes(input);
        const surfaceCubes = this.getSurfaceCubes(cubes);
        let surfaceArea = 0;
        surfaceCubes.forEach(cube => {
            surfaceArea += this.getNeighborCount(cube, cubes);
        });
        return surfaceArea;
    }

    private getCubes(input: string): Set<string> {
        const set = new Set<string>();
        const lines = input.replaceAll('\r', '').split('\n');
        lines.forEach(l => {
            set.add(l);
        });
        return set;
    }

    private getNeighborCount(cube: string, cubes: Set<string>): number {
        let count = 0;
        const [x, y, z] = cube.split(',').map(Number);
        [x, y, z].forEach((v, i) => {
            for (let j = v - 1; j <= v + 1; j++) {
                const key = [x, y, z];
                key[i] = j;
                if ([x, y, z].toString() !== key.toString() && cubes.has(key.toString())) {
                    count++;
                }
            }
        });
        return count;
    }

    private getSurfaceCubes(cubes: Set<string>): string[] {
        const maxX = Math.max(...[...cubes.values()].map(c => c.split(',').map(Number)[0])) + 1;
        const minX = Math.min(...[...cubes.values()].map(c => c.split(',').map(Number)[0])) - 1;
        const maxY = Math.max(...[...cubes.values()].map(c => c.split(',').map(Number)[1])) + 1;
        const minY = Math.min(...[...cubes.values()].map(c => c.split(',').map(Number)[1])) - 1;
        const maxZ = Math.max(...[...cubes.values()].map(c => c.split(',').map(Number)[2])) + 1;
        const minZ = Math.min(...[...cubes.values()].map(c => c.split(',').map(Number)[2])) - 1;
        const allCubes = new Set<string>();
        for (let x = minX; x <= maxX; x++) {
            for (let y = minY; y <= maxY; y++) {
                for (let z = minZ; z <= maxZ; z++) {
                    allCubes.add([x, y, z].toString());
                }
            }
        }

        const startCube = [minX, minY, minZ];
        const surfaceCubes = this.searchSurfaceCubes(startCube.toString(), cubes, allCubes);
        return Array.from(surfaceCubes);
    }

    private searchSurfaceCubes(startCube: string, cubes: Set<string>, allCubes: Set<string>): Set<string> {
        const queue: string[] = [startCube];
        const result = new Set<string>();
        while (queue.length > 0) {
            const cube = queue.shift();
            if (!cube || !allCubes.has(cube)) {
                continue;
            }
            allCubes.delete(cube);
            const [x, y, z] = cube.split(',').map(Number);
            [x, y, z].forEach((v, i) => {
                for (let j = v - 1; j <= v + 1; j++) {
                    const key = [x, y, z];
                    key[i] = j;
                    if (cubes.has(key.toString())) {
                        result.add(cube);
                    } else if (allCubes.has(key.toString())) {
                        queue.push(key.toString());
                    }
                }
            });
        }

        return result;
    }
}