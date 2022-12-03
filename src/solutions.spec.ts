import { Day01 } from './solutions/day01';
import { Day02 } from './solutions/day02';
import { Day03 } from './solutions/day03';
import { InputReader } from './utils/inputReader';

describe('solutions', () => {
    it('day01', () => {
        const input = InputReader.readFile('src/inputs/day01.txt');
        const part1Result = new Day01().part1(input);
        expect(part1Result).toBe(66719);
        const part2Result = new Day01().part2(input);
        expect(part2Result).toBe(198551);
    });

    it('day02', () => {
        const exampleInput = InputReader.readFile('src/inputs/day02_example.txt');
        const part1ExampleResult = new Day02().part1(exampleInput);
        expect(part1ExampleResult).toBe(15);
        
        const input = InputReader.readFile('src/inputs/day02.txt');
        const part1Result = new Day02().part1(input);
        expect(part1Result).toBe(15691);

        const part2ExampleResult = new Day02().part2(exampleInput);
        expect(part2ExampleResult).toBe(12);

        const part2Result = new Day02().part2(input);
        expect(part2Result).toBe(12989);
    });

    it('day03', () => {
        const exampleInput = InputReader.readFile('src/inputs/day03_example.txt');
        const part1ExampleResult = new Day03().part1(exampleInput);
        expect(part1ExampleResult).toBe(157);

        const input = InputReader.readFile('src/inputs/day03.txt');
        const part1Result = new Day03().part1(input);
        expect(part1Result).toBe(7727);

        const part2ExampleResult = new Day03().part2(exampleInput);
        expect(part2ExampleResult).toBe(70);

        const part2Result = new Day03().part2(input);
        expect(part2Result).toBe(2609);
    });
});