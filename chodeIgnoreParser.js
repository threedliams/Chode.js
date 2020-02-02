const fs = require('fs');

module.exports = {
    parseChodeignore: function(chodeignoreFilePath) {
        if (!fs.lstatSync(chodeignoreFilePath).isFile()) {
            throw chodeignoreFilePath + " is an invalid .chodeignore file";
        }

        const parsedRules = [];
        const rawData = fs.readFileSync(chodeignoreFilePath);
        const text = rawData.toString();
        const textLines = text.split('\n');

        textLines.forEach(line => {
            parsedRules.push(line);
        });

        return parsedRules;
    }
};
