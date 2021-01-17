const fs = require('fs');
const chodeignoreParser = require('./src/chodeIgnoreParser');
const chodeArgumentParser = require('./src/chodeArgumentParser');
const chodeLogger = require('./src/chodeLogger');

const {rootDirectory, chodeignoreFilePath, encoding, verbose,} = chodeArgumentParser.parseCommandLineArguments(process.argv);

let chodeignoreRules = chodeignoreParser.parseChodeignore(chodeignoreFilePath);

let problemFiles = [];

let isValid = true;
if (fs.lstatSync(rootDirectory).isDirectory()) {
    isValid = recurseFileTree(rootDirectory)
} else {
    isValid = analyzeFile(rootDirectory)
}

chodeLogger.log();
if (isValid) {
    chodeLogger.logGreen('Overall status: Valid!');
    process.exit(0);
} else {
    chodeLogger.logRed('Overall status: Rejected.');
    chodeLogger.logRed('Problem files:');
    problemFiles.forEach(problemFile => {
        chodeLogger.logRed(problemFile);
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

    chodeLogger.log(filename + ":", verbose);
    chodeLogger.log(textLines.length + " lines long.", verbose);
    chodeLogger.log(maxLineLength + " columns wide.", verbose);

    if (maxLineLength > textLines.length) {
        chodeLogger.log('\x1b[32mChode.js approved!\x1b[0m', verbose);
        return true;
    }
    chodeLogger.log('\x1b[31mRejected - too long.\x1b[0m', verbose);
    problemFiles.push(filename);
    return false;
}
