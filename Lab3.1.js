const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    const n = parseInt(line.trim(), 10);
    if (n % 2 === 0 || n % 5 === 0) {
        console.log("Число должно быть не кратным 2 и 5");
        return;
    }

    let remainder = 0;
    let digits = 0;

    do {
        remainder = (remainder * 10 + 1) % n;
        digits++;
    } while (remainder !== 0);

    console.log(digits);
});