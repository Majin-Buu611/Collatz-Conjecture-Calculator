const form = document.querySelector('form');
const runButton = document.querySelector('#runButton');
const downloadButton = document.querySelector('#downloadButton');
const outputDiv = document.querySelector('#output');
const clearButton = document.querySelector('#clearButton');

let outputStr = '';

runButton.addEventListener('click', () => {
    const startNum = BigInt(document.querySelector('#startNum').value);
    const numIterations = parseInt(document.querySelector('#numIterations').value);

    if (numIterations < -1) {
        outputDiv.textContent = 'Please enter a valid number of iterations.';
        return;
    }

    let stopTime = 0;
    let n = startNum;
    let prevN = null;
    let alternatingCount = 0;
    let repeatedCount = 0;
    let largestNum = n;

    outputStr += n + '\n';

    while (n !== 1n) {
        if (numIterations === -1 || stopTime < numIterations) {
            if (n % 2n === 0n) {
                n /= 2n;
            } else {
                n = n * 3n + 1n;
            }
            stopTime++;
            outputStr += n + '\n';

            // Calculate pattern statistics
            if (prevN !== null) {
                if (prevN === n) {
                    repeatedCount++;
                } else {
                    alternatingCount++;
                }
            }
            prevN = n;

            // Update largest number seen so far
            if (n > largestNum) {
                largestNum = n;
            }
        } else {
            break;
        }
    }

    outputStr += 'Stop time: ' + stopTime + '\n';
    outputStr += 'Largest number: ' + largestNum + '\n';
    outputStr += 'Alternating count: ' + alternatingCount + '\n';
    outputStr += 'Repeated count: ' + repeatedCount + '\n';

    outputDiv.textContent = outputStr;
    downloadButton.disabled = false;
});

downloadButton.addEventListener('click', () => {
    const blob = new Blob([outputStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'collatz_output.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    downloadButton.disabled = true;
    outputStr = '';
});

clearButton.addEventListener('click', () => {
    outputDiv.textContent = '';
    outputStr = '';
    downloadButton.disabled = true;
});
