export class Day02 {

    private matches: { [key: string]: string[] } = {
        'A': ['Z', 'X', 'Y'],
        'B': ['X', 'Y', 'Z'],
        'C': ['Y', 'Z', 'X']
    };
    private shapePoints: { [key: string]: number } = {
        'X': 1,
        'Y': 2,
        'Z': 3
    };
    private conditions: { [key: string]: number } = {
        'X': 0,
        'Y': 1,
        'Z': 2
    };
    
    part1(input: string): number {
        let score = 0;
        input.split('\n').forEach(l => {
            const hisShape = l[0];
            const myShape = l[2];
            score += this.matches[hisShape].indexOf(myShape) * 3;
            score += this.shapePoints[myShape];
        });
        return score;
    }

    part2(input: string): number {
        let score = 0;
        input.split('\n').forEach(l => {
            const hisShape = l[0];
            const myShape = l[2];
            score += this.conditions[myShape] * 3;
            score += this.shapePoints[this.matches[hisShape][this.conditions[myShape]]];
        });
        return score;
    }
}