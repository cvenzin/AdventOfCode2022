export class Day09 {
    private rope: number[][] = [];
    private visitedPositions: Map<string, number> = new Map();

    part1(input: string): number {
        this.rope.push([0, 0], [0, 0]);
        this.visitedPositions.set(this.rope[0].toString(), 1);
        input.replaceAll('\r', '').split('\n').forEach(l => {
            const [direction, steps] = l.split(' ');
            for (let i = 0; i < Number(steps); i++) {
                const tail = this.rope[0];
                const head = this.rope[1];
                this.moveHead(head, direction);
                this.updateTail(tail, head);
                this.visitedPositions.set(tail.toString(), 1);
            }
        });

        return this.visitedPositions.size;
    }

    part2(input: string): number {
        for (let i = 0; i < 10; i++) {
            this.rope.push([0, 0]);
        }
        this.visitedPositions.set(this.rope[0].toString(), 1);
        input.replaceAll('\r', '').split('\n').forEach(l => {
            const [direction, steps] = l.split(' ');
            for (let i = 0; i < Number(steps); i++) {
                let head = this.rope.at(-1) as number[];
                this.moveHead(head, direction);
                for (let j = this.rope.length - 1; j > 0; j--) {
                    head = this.rope[j];
                    const tail = this.rope[j - 1];
                    this.updateTail(tail, head);
                }
                this.visitedPositions.set(this.rope[0].toString(), 1);
            }
        });

        return this.visitedPositions.size;
    }

    private moveHead(headPosition: number[], direction: string) {
        if (direction === 'R') {
            headPosition[0]++;
        } else if (direction === 'L') {
            headPosition[0]--;
        } else if (direction === 'U') {
            headPosition[1]++;
        } else if (direction === 'D') {
            headPosition[1]--;
        }
    }

    private updateTail(tailPosition: number[], newHeadPosition: number[]): void {
        if (this.inTouch(tailPosition, newHeadPosition)) {
            return;
        }

        const [deltaX, deltaY] = this.getDirectionDelta(tailPosition, newHeadPosition);
        if (deltaX !== 0 || deltaY !== 0) {
            tailPosition[0] += deltaX;
            tailPosition[1] += deltaY;
            return;
        }

        if(newHeadPosition[0] > tailPosition[0] && newHeadPosition[1] > tailPosition[1]){
            tailPosition[0]++;
            tailPosition[1]++;
            return;
        }

        if(newHeadPosition[0] > tailPosition[0] && newHeadPosition[1] < tailPosition[1]){
            tailPosition[0]++;
            tailPosition[1]--;
            return;
        }

        if(newHeadPosition[0] < tailPosition[0] && newHeadPosition[1] > tailPosition[1]){
            tailPosition[0]--;
            tailPosition[1]++;
            return;
        }

        if(newHeadPosition[0] < tailPosition[0] && newHeadPosition[1] < tailPosition[1]){
            tailPosition[0]--;
            tailPosition[1]--;
            return;
        }
    }

    private getDirectionDelta(tailPosition: number[], headPosition: number[]): number[] {
        if (tailPosition[0] + 2 === headPosition[0] && tailPosition[1] === headPosition[1]) {
            return [1, 0];
        }

        if (tailPosition[0] - 2 === headPosition[0] && tailPosition[1] === headPosition[1]) {
            return [-1, 0];
        }

        if (tailPosition[1] + 2 === headPosition[1] && tailPosition[0] === headPosition[0]) {
            return [0, 1];
        }

        if (tailPosition[1] - 2 === headPosition[1] && tailPosition[0] === headPosition[0]) {
            return [0, -1];
        }

        return [0, 0];
    }

    private inTouch(tailPosition: number[], headPosition: number[]): boolean {
        for (let x = tailPosition[0] - 1; x < tailPosition[0] + 2; x++) {
            for (let y = tailPosition[1] - 1; y < tailPosition[1] + 2; y++) {
                if (x === headPosition[0] && y === headPosition[1]) {
                    return true;
                }
            }
        }

        return false;
    }
}