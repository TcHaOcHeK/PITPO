function solve() {
    // Тестовые словари
    const testDictionaries = [
        {
            name: "Пример из задания",
            words: [
                'cat',
                'dig', 'dog',
                'fig',
                'fin',
                'fine',
                'fog',
                'log',
                'wine'
            ],
            expected: 5
        },
        {
            name: "Минимальный словарь",
            words: ['a', 'b'],
            expected: 2
        },
        {
            name: "Словарь с несколькими лесенками",
            words: [
                'cold',
                'cord', 'core', 'care', 'card',
                'gold', 'hold', 'bold',
                'sold', 'fold'
            ],
            expected: 5
        }
    ];

    function isEditStep(word1, word2) {
        const len1 = word1.length;
        const len2 = word2.length;

        if (Math.abs(len1 - len2) > 1) return false;

        let diff = 0;
        let i = 0, j = 0;

        while (i < len1 && j < len2) {
            if (word1[i] !== word2[j]) {
                diff++;
                if (diff > 1) return false;
                if (len1 > len2) i++;
                else if (len1 < len2) j++;
                else { i++; j++; }
            } else {
                i++; j++;
            }
        }

        return true;
    }

    function buildGraph(words) {
        const graph = {};
        const lengthGroups = {};

        // Группируем слова по длине
        for (const word of words) {
            const len = word.length;
            if (!lengthGroups[len]) lengthGroups[len] = [];
            lengthGroups[len].push(word);
            graph[word] = [];
        }

        const lengths = Object.keys(lengthGroups).map(Number).sort((a, b) => a - b);

        for (let i = 0; i < lengths.length; i++) {
            const currentLen = lengths[i];
            const wordsCurrent = lengthGroups[currentLen];

            for (let j = 0; j < wordsCurrent.length; j++) {
                for (let k = j + 1; k < wordsCurrent.length; k++) {
                    if (isEditStep(wordsCurrent[j], wordsCurrent[k])) {
                        graph[wordsCurrent[j]].push(wordsCurrent[k]);
                        graph[wordsCurrent[k]].push(wordsCurrent[j]);
                    }
                }
            }

            const nextLen = currentLen + 1;
            if (lengthGroups[nextLen]) {
                const wordsNext = lengthGroups[nextLen];
                for (const word1 of wordsCurrent) {
                    for (const word2 of wordsNext) {
                        if (isEditStep(word1, word2)) {
                            graph[word1].push(word2);
                            graph[word2].push(word1);
                        }
                    }
                }
            }
        }

        return graph;
    }

    function findLongestLadder(graph) {
        const memo = {};
        let maxLength = 1;

        function dfs(word, visited) {
            if (memo[word]) return memo[word];

            let maxDepth = 1;
            visited[word] = true;

            for (const neighbor of graph[word]) {
                if (!visited[neighbor]) {
                    const depth = dfs(neighbor, visited);
                    if (depth + 1 > maxDepth) {
                        maxDepth = depth + 1;
                    }
                }
            }

            visited[word] = false;
            memo[word] = maxDepth;
            return maxDepth;
        }

        for (const word in graph) {
            const currentLength = dfs(word, {});
            if (currentLength > maxLength) {
                maxLength = currentLength;
            }
        }

        return maxLength;
    }

    for (const dict of testDictionaries) {
        console.log(`\nСловарь: ${dict.name}`);
        console.log(`Количество слов: ${dict.words.length}`);

        const graph = buildGraph(dict.words);
        const result = findLongestLadder(graph);

        console.log(`Найдена лесенка длиной: ${result}`);
        console.log(`Ожидаемый результат: ${dict.expected}`);
    }
}

solve();