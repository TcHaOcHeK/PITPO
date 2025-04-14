function countNumbers(n) {
    const dp = new Array(n + 1).fill(0);
    dp[0] = 1;

    for (let i = 1; i <= n; i++) {
        if (i >= 1) dp[i] += dp[i - 1] * 2; // 1 или 4
        if (i >= 2) dp[i] += dp[i - 2];     // 2
        if (i >= 3) dp[i] += dp[i - 3];     // 3
    }

    return dp[n];
}
const input = [2, 3];//Тест
input.forEach(n => console.log(countNumbers(n)));
// Вывод:
// 5
// 13