export class Day12 {
    private keys = 'abcdefghijklmnopqrstuvwxyz';

    part1(input: string): number {
        const map = this.getMap(input);
        return this.findShortesPath(map, 'E');
    }

    part2(input: string): number {
        const map = this.getMap(input);
        const eNode = [...map.values()].find(node => node.letter === 'E');
        if (eNode) {
            eNode.distance = 0;
        }
        const sNode = [...map.values()].find(node => node.letter === 'S');
        if (sNode) {
            sNode.letter = 'a';
            sNode.distance = Number.MAX_SAFE_INTEGER;
        }
        return this.findShortesPath(map, 'a');
    }

    private getMap(input: string): Map<string, Node> {
        const lines = input.replaceAll('\r', '').split('\n');
        const map = new Map<string, Node>();

        for (let y = 0; y < lines.length; y++) {
            for (let x = 0; x < lines[y].length; x++) {
                const node: Node = {
                    letter: lines[y][x],
                    numericValue: this.keys.indexOf(lines[y][x]),
                    neighbors: [],
                    coordinate: [x, y],
                    distance: Number.MAX_SAFE_INTEGER
                };
                map.set(`${x},${y}`, node);
                if (node.letter === 'S') {
                    node.distance = 0;
                    node.numericValue = this.keys.indexOf('a');
                } else if (node.letter === 'E') {
                    node.numericValue = this.keys.indexOf('z');
                }
            }
        }

        for (const node of map.values()) {
            const x = node.coordinate[0];
            const y = node.coordinate[1];
            const neighborCoords = [`${x + 1},${y}`, `${x - 1},${y}`, `${x},${y + 1}`, `${x},${y - 1}`];
            neighborCoords.forEach(nc => {
                const neighbor = map.get(nc);
                if (neighbor) {
                    node.neighbors.push(neighbor);
                }
            });
        }

        return map;
    }

    private findNodeWithShortestDistance(nodes: Node[]) {
        let resultNode = nodes[0];
        let distance = Number.MAX_SAFE_INTEGER;
        for (const node of nodes) {
            if (node.distance < distance) {
                distance = node.distance;
                resultNode = node;
            }
        }
        return resultNode;
    }

    // Dijkstra shortest path
    private findShortesPath(map: Map<string, Node>, targetLetter: 'a' | 'E'): number {
        while (map.size > 0) {
            const node = this.findNodeWithShortestDistance([...map.values()]);
            map.delete(node.coordinate.toString());
            for (const neighbor of node.neighbors) {
                if (map.has(neighbor.coordinate.toString())) {
                    let canGoSteep = false;
                    if (targetLetter === 'a' && node.numericValue <= neighbor.numericValue) {
                        canGoSteep = true;
                    }

                    if (targetLetter === 'E' && node.numericValue >= neighbor.numericValue) {
                        canGoSteep = true;
                    }

                    if (canGoSteep || Math.abs(node.numericValue - neighbor.numericValue) === 1) {
                        const distance = node.distance + 1;
                        if (distance < neighbor.distance) {
                            neighbor.distance = distance;
                            if (neighbor.letter === targetLetter) {
                                return neighbor.distance;
                            }
                        }
                    }
                }
            }
        }

        return 0;
    }
}

interface Node {
    numericValue: number;
    coordinate: number[];
    letter: string;
    neighbors: Node[];
    distance: number;
}