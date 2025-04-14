const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function processInput() {
    let scenarioCount = 0;
    let currentScenario = 0;
    let P = 0, N = 0;
    let articles = [];
    let authorsToCheck = [];
    let graph = new Map();
    let erdosNumbers = new Map();

//разбиваем входную строку на части
    rl.on('line', (line) => {
        if (!scenarioCount) {
            scenarioCount = parseInt(line.trim(), 10);
            return;
        }

        if (P === 0 && N === 0) {
            [P, N] = line.trim().split(' ').map(Number);
            return;
        }

        if (articles.length < P) {
            articles.push(line.trim());
            return;
        }

        if (authorsToCheck.length < N) {
            authorsToCheck.push(line.trim());
        }

        if (articles.length === P && authorsToCheck.length === N) {
            currentScenario++;
            processScenario(currentScenario, articles, authorsToCheck);
            // Reset for next scenario
            P = 0;
            N = 0;
            articles = [];
            authorsToCheck = [];
        }
    });

    function processScenario(scenarioNum, articles, authorsToCheck) {
        graph.clear();
        erdosNumbers.clear();

        //создал граф
        for (const article of articles) {
            const [authorsPart] = article.split(':');
            const authors = authorsPart.split(',').map(a => a.trim()).filter(a => a);
            const formattedAuthors = [];
            for (let i = 0; i < authors.length; i += 2) {
                if (i + 1 < authors.length) {
                    formattedAuthors.push(`${authors[i]}, ${authors[i + 1]}`);
                } else {
                    formattedAuthors.push(authors[i]);
                }
            }


            for (const author of formattedAuthors) {
                if (!graph.has(author)) {
                    graph.set(author, new Set());
                }
            }

            for (let i = 0; i < formattedAuthors.length; i++) {
                for (let j = i + 1; j < formattedAuthors.length; j++) {
                    const a1 = formattedAuthors[i];
                    const a2 = formattedAuthors[j];
                    graph.get(a1).add(a2);
                    graph.get(a2).add(a1);
                }
            }
        }

        //число эрдеша проверяем соседей
        const queue = [];
        erdosNumbers.set('Erdos, P.', 0);
        queue.push('Erdos, P.');

        while (queue.length > 0) {
            const current = queue.shift();
            const currentNumber = erdosNumbers.get(current);

            if (graph.has(current)) {
                for (const neighbor of graph.get(current)) {
                    if (!erdosNumbers.has(neighbor)) {
                        erdosNumbers.set(neighbor, currentNumber + 1);
                        queue.push(neighbor);
                    }
                }
            }
        }

        //результат
        console.log(`\nScenario ${scenarioNum}`);
        for (const author of authorsToCheck) {
            const number = erdosNumbers.get(author);
            if (number !== undefined) {
                console.log(`${author} ${number}`);
            } else {
                console.log(`${author} infinity`);
            }
        }
    }
}

processInput();