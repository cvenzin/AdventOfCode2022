export class Day11 {
    part1(input: string): number {
        const monkeys = this.getMonkeys(input);
        for (let i = 0; i < 20; i++) {
            this.processRound(monkeys);
        }
        monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
        return monkeys[0].inspectedItems * monkeys[1].inspectedItems;
    }

    part2(input: string): number {
        const monkeys = this.getMonkeys(input);
        const divisor = this.getDivisor(monkeys);
        for (let i = 0; i < 10000; i++) {
            this.processRound(monkeys, divisor);
        }
        monkeys.sort((a, b) => b.inspectedItems - a.inspectedItems);
        return monkeys[0].inspectedItems * monkeys[1].inspectedItems;
    }

    private processRound(monkeys: Monkey[], divisor?: number): void {
        monkeys.forEach(monkey => {
            while (monkey.items.length > 0) {
                const item = monkey.items.shift();
                if (item !== undefined) {
                    monkey.inspectedItems++;
                    const worryLevel = this.executeOperation(monkey.operation, item);
                    const newWorryLevel = divisor ? worryLevel % divisor : Math.floor(worryLevel / 3);
                    if (newWorryLevel % monkey.divisble === 0) {
                        monkeys[monkey.target1].items.push(newWorryLevel);
                    } else {
                        monkeys[monkey.target2].items.push(newWorryLevel);
                    }
                }
            }
        });
    }

    private getMonkeys(input: string): Monkey[] {
        const lines = input.replaceAll('\r', '').split('\n');
        const monkeys: Monkey[] = [];
        for (let i = 0; i < lines.length; i += 7) {
            const items = lines[i + 1].split(': ')[1].split(', ').map(Number);
            const divisble = Number(lines[i + 3].split('by ')[1]);
            const operation = lines[i + 2].split('= ')[1];
            const target1 = Number(lines[i + 4].split('monkey ')[1]);
            const target2 = Number(lines[i + 5].split('monkey ')[1]);
            const monkey: Monkey = {
                items,
                divisble,
                operation,
                target1,
                target2,
                inspectedItems: 0
            };
            monkeys.push(monkey);
        }
        return monkeys;
    }

    private executeOperation(operation: string, old: number): number {
        return eval(operation.replaceAll('old', old.toString(10)));
    }

    private getDivisor(monkeys: Monkey[]): number {
        const numbers = monkeys.map(m => m.divisble);
        let i = 1;
        while (i) {
            if (numbers.every(n => {
                return i % n === 0;
            })) {
                return i;
            }
            i++;
        }

        return 0;
    }
}

interface Monkey {
    items: number[];
    operation: string;
    divisble: number;
    target1: number;
    target2: number;
    inspectedItems: number;
}