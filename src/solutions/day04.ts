export class Day04 {

    part1(input: string): number {
        let fullyContainedSections = 0;
        input.split('\n').map(l => l.trim()).forEach(l => {
            const numbers = l.match(/\d+/g)?.map(Number) ?? [];
            if (this.isFullyContained(numbers)) {
                fullyContainedSections++;
            }
        });
        return fullyContainedSections;
    }

    part2(input: string): number {
        let overlappingSections = 0;
        input.split('\n').map(l => l.trim()).forEach(l => {
            const numbers = l.match(/\d+/g)?.map(Number) ?? [];
            if (
                this.isFullyContained(numbers) ||
                numbers[0] >= numbers[2] && numbers[0] <= numbers[3] ||
                numbers[1] >= numbers[2] && numbers[1] <= numbers[3]
            ) {
                overlappingSections++;
            }
        });
        return overlappingSections;
    }

    private isFullyContained(numbers: number[]): boolean {
        if (numbers[0] <= numbers[2] && numbers[1] >= numbers[3] || numbers[2] <= numbers[0] && numbers[3] >= numbers[1]) {
            return true;
        }
        return false;
    }
}