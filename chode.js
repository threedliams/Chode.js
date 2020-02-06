const fs = require('fs');
const chodeignoreParser = require('./chodeIgnoreParser');

const rootDirectory = process.argv[2] ? process.argv[2] : '.';
const chodeignoreFilePath = process.argv[3] ? process.argv[3] : '.chodeignore';
const encoding = process.argv[4] ? process.argv[4] : 'utf-8';

let chodeignoreRules = chodeignoreParser.parseChodeignore(chodeignoreFilePath);

let problemFiles = [];

let isValid = true;
if (fs.lstatSync(rootDirectory).isDirectory()) {
    isValid = recurseFileTree(rootDirectory)
} else {
    isValid = analyzeFile(rootDirectory)
}

console.log();
if (isValid) {
    console.log('\x1b[32mOverall status: Valid!\x1b[0m');
    process.exit(0);
} else {
    console.log('\x1b[31mOverall status: Rejected.\x1b[0m');
    console.log('\x1b[31mProblem files:\x1b[0m');
    problemFiles.forEach(problemFile => {
        console.log('\x1b[31m' + problemFile + '\x1b[0m');
    });
    process.exit(1);
}

function recurseFileTree(path) {
    if (chodeignoreRules.includes(path.replace(rootDirectory + '/', ''))) {
        return true;
    }

    let isValid = true;
    if (fs.lstatSync(path).isDirectory()) {
        fs.readdirSync(path).forEach(subPath => {
            isValid = isValid & recurseFileTree(path + '/' + subPath);
        });
    } else {
        isValid = analyzeFile(path);
    }

    return isValid;
}

function analyzeFile(filename) {
    const rawData = fs.readFileSync(filename, encoding);
    const text = rawData.toString(encoding);
    const textLines = text.split("\n");

    let maxLineLength = 0;
    textLines.forEach(line => {
        if (line.length > maxLineLength) {
            maxLineLength = line.length;
        }
    });

    console.log(filename + ":");
    console.log(textLines.length + " lines long.");
    console.log(maxLineLength + " columns wide.");

    if (maxLineLength > textLines.length) {
        console.log('\x1b[32mChode.js approved!\x1b[0m');
        return true;
    }
    console.log('\x1b[31mRejected - too long.\x1b[0m');
    problemFiles.push(filename);
    return false;
}
