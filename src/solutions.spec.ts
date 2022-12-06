import { Day01 } from './solutions/day01';
import { Day02 } from './solutions/day02';
import { Day03 } from './solutions/day03';
import { Day04 } from './solutions/day04';
import { Day05 } from './solutions/day05';
import { Day06 } from './solutions/day06';
import { InputReader } from './utils/inputReader';

describe('solutions', () => {
    it('day01', () => {
        const input = InputReader.readFile('src/inputs/day01.txt');
        expect(new Day01().part1(input)).toBe(66719);
        expect(new Day01().part2(input)).toBe(198551);
    });

    it('day02', () => {
        const exampleInput = InputReader.readFile('src/inputs/day02_example.txt');
        const input = InputReader.readFile('src/inputs/day02.txt');
        expect(new Day02().part1(exampleInput)).toBe(15);
        expect(new Day02().part1(input)).toBe(15691);
        expect(new Day02().part2(exampleInput)).toBe(12);
        expect(new Day02().part2(input)).toBe(12989);
    });

    it('day03', () => {
        const exampleInput = InputReader.readFile('src/inputs/day03_example.txt');
        const input = InputReader.readFile('src/inputs/day03.txt');
        expect(new Day03().part1(exampleInput)).toBe(157);
        expect(new Day03().part1(input)).toBe(7727);
        expect(new Day03().part2(exampleInput)).toBe(70);
        expect(new Day03().part2(input)).toBe(2609);
    });

    it('day04', () => {
        const exampleInput = InputReader.readFile('src/inputs/day04_example.txt');
        const input = InputReader.readFile('src/inputs/day04.txt');
        expect(new Day04().part1(exampleInput)).toBe(2);
        expect(new Day04().part1(input)).toBe(441);
        expect(new Day04().part2(exampleInput)).toBe(4);
        expect(new Day04().part2(input)).toBe(861);
    });

    it('day05', () => {
        const exampleInput = InputReader.readFile('src/inputs/day05_example.txt');
        const input = InputReader.readFile('src/inputs/day05.txt');
        expect(new Day05().part1(exampleInput)).toBe('CMZ');
        expect(new Day05().part1(input)).toBe('VCTFTJQCG');
        expect(new Day05().part2(exampleInput)).toBe('MCD');
        expect(new Day05().part2(input)).toBe('GCFGLDNJZ');
    });

    it('day06', () => {
        const exampleInput = InputReader.readFile('src/inputs/day06_example.txt');
        const input = InputReader.readFile('src/inputs/day06.txt');
        expect(new Day06().part1(exampleInput)).toBe(7);
        expect(new Day06().part1(input)).toBe(1953);
        expect(new Day06().part2(exampleInput)).toBe(19);
        expect(new Day06().part2(input)).toBe(2301);
    });
});