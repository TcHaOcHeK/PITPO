function solve() {
    const testCases = [
        {
            name: "Граф-звезда (4 города)",
            input: [
                '4 3',
                '1 2',
                '1 3',
                '1 4',
                '0 0'
            ],
            expected: 1
        },

        {
            name: "Пример из задания (8 городов)",
            input: [
                '8 12',
                '1 2',
                '1 6',
                '1 8',
                '2 3',
                '2 6',
                '3 4',
                '3 5',
                '4 5',
                '4 7',
                '5 6',
                '6 7',
                '6 8',
                '0 0'
            ],
            expected: 2
        }
    ];

    testCases.forEach(testCase => {
        console.log(`\n${testCase.name}`);

        let inputIndex = 0;
        function readline() {
            return testCase.input[inputIndex++];
        }

        let input = [];
        while (true) {
            const line = readline();
            const [n, m] = line.trim().split(' ').map(Number);
            if (n === 0 && m === 0) {
                processInput();
                break;
            } else {
                input.push(line);
            }
        }

        function processInput() {
            let index = 0;
            while (index < input.length) {
                const [n, m] = input[index++].split(' ').map(Number);
                const adj = Array.from({ length: n + 1 }, () => []);

                for (let i = 0; i < m; i++) {
                    const [u, v] = input[index++].split(' ').map(Number);
                    adj[u].push(v);
                    adj[v].push(u);
                }

                const result = findMinStations(n, adj);
                console.log(`  Результат: ${result}`);
                console.log(`  Ожидалось: ${testCase.expected}`);
            }
        }

        function findMinStations(n, adj) {
            const covered = new Array(n + 1).fill(false);
            let stations = 0;

            while (true) {
                let bestCity = -1;
                let maxCover = -1;

                for (let city = 1; city <= n; city++) {
                    if (!covered[city]) {
                        let coverCount = 1;
                        for (const neighbor of adj[city]) {
                            if (!covered[neighbor]) {
                                coverCount++;
                            }
                        }

                        if (coverCount > maxCover) {
                            maxCover = coverCount;
                            bestCity = city;
                        }
                    }
                }

                if (bestCity === -1) break;

                stations++;
                covered[bestCity] = true;
                for (const neighbor of adj[bestCity]) {
                    covered[neighbor] = true;
                }
            }

            return stations;
        }
    });
}

solve();