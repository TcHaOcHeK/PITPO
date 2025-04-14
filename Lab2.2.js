function solve() {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        terminal: false
    });

    let lineCount = 0;
    let testCases = 0;
    let currentTestCase = 0;
    let n = 0;
    let orders = [];

    rl.on('line', (line) => {
        line = line.trim();
        if (!line) {
            return;
        }

        if (lineCount === 0) {
            testCases = parseInt(line, 10);
            lineCount++;
        } else if (currentTestCase < testCases) {
            if (n === 0) {
                n = parseInt(line, 10);
                orders = [];
            } else {
                const [t, s] = line.split(/\s+/).map(Number);
                orders.push({ t, s, index: orders.length + 1 });
                if (orders.length === n) {
                    // Сортируем заказы по Si/Ti в убывающем порядке, затем по индексу
                    orders.sort((a, b) => {
                        const ratioA = a.s / a.t;
                        const ratioB = b.s / b.t;
                        if (ratioA !== ratioB) {
                            return ratioB - ratioA;
                        } else {
                            return a.index - b.index;
                        }
                    });

                    // Вывод
                    const result = orders.map(order => order.index).join(' ');
                    console.log(result);

                    currentTestCase++;
                    n = 0;
                    orders = [];

                    if (currentTestCase < testCases) {
                        console.log();
                    }
                }
            }
        }
    });
}

solve();