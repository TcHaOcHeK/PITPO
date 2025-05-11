function solve() {
    const testCases = [
        {
            name: "Матрица 5x6 (пример 1)",
            input: [
                '5 6',
                '3 4 1 2 8 6',
                '6 1 8 2 7 4',
                '5 9 3 9 9 5',
                '8 4 1 3 2 6',
                '3 7 2 8 6 4',
                'EOF'
            ],
            expected: {
                path: [1, 2, 3, 4, 4, 5],
                cost: 16
            }
        },
        {
            name: "Матрица 5x6 (пример 2)",
            input: [
                '5 6',
                '3 4 1 2 8 6',
                '6 1 8 2 7 4',
                '5 9 3 9 9 5',
                '8 4 1 3 2 6',
                '3 7 2 1 2 3',
                'EOF'
            ],
            expected: {
                path: [1, 2, 1, 5, 4, 5],
                cost: 11
            }
        }
    ];

    function findMinPath(matrix, m, n) {
        // Создаем таблицу DP
        const dp = Array.from({ length: m }, () => new Array(n).fill(0));
        const path = Array.from({ length: m }, () => new Array(n).fill(0));

        for (let i = 0; i < m; i++) {
            dp[i][0] = matrix[i][0];
            path[i][0] = i;
        }

        for (let j = 1; j < n; j++) {
            for (let i = 0; i < m; i++) {
                // Находим предыдущие строки (с учетом цилиндричности)
                const prevRows = [
                    (i - 1 + m) % m,
                    i,
                    (i + 1) % m
                ].sort((a, b) => a - b); // Сортируем для лексикографического порядка

                let minVal = Infinity;
                let minRow = -1;
                for (const row of prevRows) {
                    if (dp[row][j - 1] < minVal) {
                        minVal = dp[row][j - 1];
                        minRow = row;
                    }
                }

                dp[i][j] = minVal + matrix[i][j];
                path[i][j] = minRow;
            }
        }

        let minCost = Infinity;
        let lastRow = -1;
        for (let i = 0; i < m; i++) {
            if (dp[i][n - 1] < minCost) {
                minCost = dp[i][n - 1];
                lastRow = i;
            }
        }

        const resultPath = new Array(n);
        resultPath[n - 1] = lastRow + 1;
        for (let j = n - 2; j >= 0; j--) {
            lastRow = path[lastRow][j + 1];
            resultPath[j] = lastRow + 1;
        }

        return {
            path: resultPath,
            cost: minCost
        };
    }

    // Тестируем каждый случай
    testCases.forEach(testCase => {
        console.log(`\n\n${testCase.name}`);

        let inputIndex = 0;
        function readline() {
            return testCase.input[inputIndex++];
        }

        const [m, n] = readline().split(' ').map(Number);

        const matrix = [];
        for (let i = 0; i < m; i++) {
            const row = readline().trim().split(/\s+/).map(Number);
            matrix.push(row);
        }

        const result = findMinPath(matrix, m, n);

        console.log(`  Путь: ${result.path.join(' ')}`);
        console.log(`  Стоимость: ${result.cost}`);
        console.log(`  \nОжидаемый путь: ${testCase.expected.path.join(' ')}`);
        console.log(`  Ожидаемая стоимость: ${testCase.expected.cost}`);
        console.log(`  ${result.cost === testCase.expected.cost }`);
    });
}

solve();