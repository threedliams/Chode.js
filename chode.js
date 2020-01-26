const fs = require('fs');

const filename = process.argv[2];
const encoding = process.argv[3] ? process.argv[3] : 'utf-8';

let text = '';
fs.readFile(filename, encoding, (e, rawData) => {
    if (e) {
        throw e;
    }

    text = rawData.toString(encoding);

    const textLines = text.split("\n");

    let maxLineLength = 0;
    textLines.forEach(line => {
        if (line.length > maxLineLength) {
            maxLineLength = line.length;
        }
    });

    console.log(textLines.length + " lines long.");
    console.log(maxLineLength + " columns wide.");
    if (maxLineLength > textLines.length) {
        console.log('Chode.js approved!');
    } else {
        console.log('Rejected - too long.');
        process.exit(1);
    }
});
