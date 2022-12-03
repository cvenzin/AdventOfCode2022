export class Day03 {
    private chars = 'abcdefghijklmnopqrstuvwxyz';
    private priorities = `_${this.chars}${this.chars.toUpperCase()}`;

    part1(input: string): number {
        let totalPriority = 0;
        input.split('\n').map(l => l.trim()).forEach(l => {
            const c1 = l.substring(0, l.length / 2);
            const c2 = l.substring(l.length / 2, l.length);
            for (const item of c1.split('')) {
                if (c2.includes(item)) {
                    totalPriority += this.priorities.indexOf(item);
                    break;
                }
            }
        });
        return totalPriority;
    }

    part2(input: string): number {
        let totalPriority = 0;
        const rucksacks = input.split('\n').map(l => l.trim());
        for (let i = 0; i < rucksacks.length; i += 3) {
            for (const item of rucksacks[i].split('')) {
                if (rucksacks[i + 1].includes(item) && rucksacks[i + 2].includes(item)) {
                    totalPriority += this.priorities.indexOf(item);
                    break;
                }
            }
        }
        return totalPriority;
    }
}