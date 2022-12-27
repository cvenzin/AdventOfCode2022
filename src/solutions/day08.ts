export class Day08 {

    private map: Map<string, number> = new Map();
    private directions = ['U', 'D', 'R', 'L'];

    part1(input: string): number {
        this.createMap(input);
        let result = 0;
        this.map.forEach((value, key) => {
            if (this.isVisible(key.split(',').map(Number), value)) {
                result++;
            }
        });
        return result;
    }

    part2(input: string): number {
        this.createMap(input);
        const scores: number[] = [];
        this.map.forEach((value, key) => {
            const score = this.getScenicScore(key.split(',').map(Number), value);
            scores.push(score);
        });
        return Math.max(...scores);
    }

    private createMap(input: string) {
        const lines = input.replaceAll('\r', '').split('\n');
        for (let i = 0; i < lines.length; i++) {
            const trees = lines[i].split('').map(Number);
            for (let j = 0; j < trees.length; j++) {
                this.map.set(`${j},${i}`, trees[j]);
            }
        }
    }

    private isVisible(pos: number[], height: number): boolean {
        const invisibleDirections: boolean[] = [];
        this.directions.forEach(d => {
            this.setVisibleDirectionsAndScenicScore([...pos], d, invisibleDirections, height, []);
        });
        return invisibleDirections.filter(d => d).length < 4;
    }

    private setVisibleDirectionsAndScenicScore(pos: number[], direction: string, invisibleDirections: boolean[], height: number, scenicScores: number[]) {
        let scenicScore = 0;
        while (this.map.get((this.getUpdatedPosition(pos, direction)).toString()) !== undefined) {
            if ((this.map.get(pos.toString()) || 0) >= height) {
                invisibleDirections.push(true);
                scenicScore++;
                break;
            }
            scenicScore++;
        }
        scenicScores.push(scenicScore);
    }

    private getUpdatedPosition(pos: number[], direction: string): number[] {
        if (direction === 'U') {
            --pos[1];
        } else if (direction === 'D') {
            ++pos[1];
        } else if (direction === 'L') {
            --pos[0];
        } else if (direction === 'R') {
            ++pos[0];
        }
        return pos;
    }

    private getScenicScore(pos: number[], height: number): number {
        const scenicScores: number[] = [];
        this.directions.forEach(d => {
            this.setVisibleDirectionsAndScenicScore([...pos], d, [], height, scenicScores);
        });
        return scenicScores.reduce((a, b) => a * b);
    }
}