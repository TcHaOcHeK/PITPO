function solve() {
    const input = [
        '4 5',
        '4 5 3 5',
        '3 5 2 6 4',
        '4 5',
        '4 5 3 5',
        '3 5 2 6 3',
        '0 0'
    ];

    let currentLine = 0;
    const readline = () => input[currentLine++];

    function canArrange(m, n, teams, tables) {
        const totalTeams = teams.reduce((a, b) => a + b, 0);
        const totalTables = tables.reduce((a, b) => a + b, 0);
        return totalTeams <= totalTables && Math.max(...teams) <= totalTables - (n - 1);
    }

    function arrange(m, n, teams, tables) {
        const sortedTeams = teams.map((size, i) => ({size, index: i})).sort((a, b) => b.size - a.size);
        const sortedTables = tables.map((size, i) => ({size, index: i + 1}));
        const result = Array(m).fill().map(() => []);

        for (const team of sortedTeams) {
            for (let i = 0; i < team.size; i++) {
                sortedTables.sort((a, b) => b.size - a.size);
                result[team.index].push(sortedTables[0].index);
                sortedTables[0].size--;
            }
        }

        return result.map(arr => arr.sort((a, b) => a - b).join(' '));
    }

    while (true) {
        const line = readline();
        if (line === undefined) break;

        const [m, n] = line.split(' ').map(Number);
        if (m === 0 && n === 0) break;

        const teams = readline().split(' ').map(Number);
        const tables = readline().split(' ').map(Number);

        const possible = canArrange(m, n, teams, tables);
        console.log(possible ? '1' : '0');

        if (possible) {
            const arrangement = arrange(m, n, teams, tables);
            arrangement.forEach(row => console.log(row));
        }
    }
}

solve();