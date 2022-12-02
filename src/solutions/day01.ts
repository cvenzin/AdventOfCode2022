export class Day01 {
    part1(input: string): number {
        return this.getSortedCaloriesPerElve(input)[0];
    }

    part2(input: string): number {
        return this.getSortedCaloriesPerElve(input).slice(0, 3).reduce((a, b) => a + b);
    }

    private getSortedCaloriesPerElve(input: string) {
        return input.split(/\n{2,}/g).map(n => n.split('\n').map(nn => Number(nn))).map(n => n.reduce((a, b) => a + b)).sort((a, b) => b - a);
    }
}