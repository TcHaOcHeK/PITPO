const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function main() {
    let testCaseCount = 0;
    let currentTestCase = 0;
    let lines = [];
    let isFirstLine = true;
    let emptyLineCount = 0;

    rl.on('line', (line) => {
        if (isFirstLine) {
            testCaseCount = parseInt(line.trim(), 10);
            isFirstLine = false;
            return;
        }

        if (line.trim() === '') {
            emptyLineCount++;
            if (emptyLineCount === 1 && lines.length > 0) {
                processTestCase(lines);
                lines = [];
                currentTestCase++;
            }
            return;
        }

        emptyLineCount = 0;
        lines.push(line.trim());
    });

    rl.on('close', () => {
        if (lines.length > 0) {
            processTestCase(lines);
        }
    });

    function processTestCase(encryptedLines) {
        // Ищю "the quick brown fox jumps over the lazy dog"
        const reference = 'the quick brown fox jumps over the lazy dog';
        let cipher = null;

        for (const line of encryptedLines) {
            if (line.length === reference.length) {
                const potentialCipher = createCipher(line, reference);
                if (potentialCipher && isCompleteCipher(potentialCipher)) {
                    cipher = potentialCipher;
                    break;
                }
            }
        }

        if (!cipher) {
            console.log('No solution\n');
            return;
        }

        // Расшифровка
        for (const line of encryptedLines) {
            console.log(decryptLine(line, cipher));
        }

        if (currentTestCase < testCaseCount - 1) {
            console.log();
        }
    }

    function createCipher(encrypted, plain) {
        if (encrypted.length !== plain.length) return null;

        const cipher = {};
        const used = new Set();

        for (let i = 0; i < encrypted.length; i++) {
            const eChar = encrypted[i];
            const pChar = plain[i];

            // Пробелы
            if (pChar === ' ' && eChar !== ' ') return null;
            if (pChar !== ' ' && eChar === ' ') return null;

            if (pChar === ' ') continue;

            if (cipher[eChar]) {
                if (cipher[eChar] !== pChar) return null;
            } else {
                if (used.has(pChar)) return null;
                cipher[eChar] = pChar;
                used.add(pChar);
            }
        }

        return cipher;
    }

    function isCompleteCipher(cipher) {
        // Проверяем полноту кодировки
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        const cipherValues = new Set(Object.values(cipher));

        for (const char of alphabet) {
            if (!cipherValues.has(char)) return false;
        }

        return true;
    }

    function decryptLine(line, cipher) {
        let result = '';
        for (const char of line) {
            if (char === ' ') {
                result += ' ';
            } else {
                result += cipher[char] || '?';
            }
        }
        return result;
    }
}

main();