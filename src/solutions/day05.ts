export class Day05 {

    part1(input: string): string {
        const stacks = this.getStacks(input);
        const moves = this.getMoves(input);
        moves.forEach(move => {
            stacks[move[2]].push(...stacks[move[1]].splice(stacks[move[1]].length - move[0]).reverse());
        });
        return stacks.map(s => s.pop()).join('');
    }

    part2(input: string): string {
        const stacks = this.getStacks(input);
        const moves = this.getMoves(input);
        moves.forEach(move => {
            stacks[move[2]].push(...stacks[move[1]].splice(stacks[move[1]].length - move[0]));
        });
        return stacks.map(s => s.pop()).join('');
    }

    private getStacks(input: string) {
        const stacks: [string[]] = [[]];
        for (const l of input.split('\n')) {
            if (l[1] === '1') {
                break;
            }
            for (let i = 1; i < l.length; i += 4) {
                if (l[i] !== ' ') {
                    const index = Math.floor(i / 4) + 1;
                    if (!stacks[index]) {
                        stacks[index] = [];
                    }
                    stacks[index].push(l[i]);
                }
            }
        }

        return stacks.map(s => s.reverse());
    }

    private getMoves(input: string) {
        return input.split('\n').filter(l => l.startsWith('move')).map(l => l.match(/\d+/g)?.map(Number) ?? []);
    }
}