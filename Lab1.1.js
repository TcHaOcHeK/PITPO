function printLcdNumber(s, n) {
    const digitPatterns = {
        '0': ['a', 'b', 'c', 'd', 'e', 'f'],
        '1': ['b', 'c'],
        '2': ['a', 'b', 'g', 'e', 'd'],
        '3': ['a', 'b', 'g', 'c', 'd'],
        '4': ['f', 'g', 'b', 'c'],
        '5': ['a', 'f', 'g', 'c', 'd'],
        '6': ['a', 'f', 'g', 'c', 'd', 'e'],
        '7': ['a', 'b', 'c'],
        '8': ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
        '9': ['a', 'b', 'c', 'd', 'f', 'g']
    };

    function horizontalSegment(segment) {
        return ' ' + '-'.repeat(s) + ' ';
    }

    function verticalSegment(left, right) {
        return (left ? '|' : ' ') + ' '.repeat(s) + (right ? '|' : ' ');
    }

    const digits = String(n).split('');

    const output = Array.from({ length: 2 * s + 3 }, () => '');

    digits.forEach(digit => {
        const pattern = digitPatterns[digit];
        for (let i = 0; i < 2 * s + 3; i++) {
            if (i === 0) {
                output[i] += (pattern.includes('a') ? horizontalSegment('a') : ' '.repeat(s + 2)) + ' ';
            } else if (i < s + 1) {
                output[i] += verticalSegment(pattern.includes('f'), pattern.includes('b')) + ' ';
            } else if (i === s + 1) {
                output[i] += (pattern.includes('g') ? horizontalSegment('g') : ' '.repeat(s + 2)) + ' ';
            } else if (i < 2 * s + 2) {
                output[i] += verticalSegment(pattern.includes('e'), pattern.includes('c')) + ' ';
            } else {
                output[i] += (pattern.includes('d') ? horizontalSegment('d') : ' '.repeat(s + 2)) + ' ';
            }
        }
    });

    output.forEach(line => console.log(line));
    console.log();
}

const input = [
    [2, 12345],
    [1, 67890],
    [0, 0]
];

input.forEach(([s, n]) => {
    if (s === 0 && n === 0) return; // Завершаем выполнение
    printLcdNumber(s, n);
});


