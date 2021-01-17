module.exports = {
    parseCommandLineArguments: function(arguments) {
        const rootDirectory = findArg(arguments, 'directory', 'd', '.');
        const chodeignoreFilePath = findArg(arguments, 'chodeignore', 'c', '.chodeignore');
        const encoding = findArg(arguments, 'encoding', 'e', 'utf-8');
        const verbose = isArgPresent(arguments, 'verbose', 'v')

        return {
            rootDirectory,
            chodeignoreFilePath,
            encoding,
            verbose,
        };
    }
}

function findArg(arguments, keyword, keyletter, defaultValue) {
    let index = arguments.indexOf('--' + keyword);

    if (index === -1) {
        index = arguments.indexOf('-' + keyletter);
    }

    if (index === -1 || !arguments[index + 1]) {
        return defaultValue;
    }

    return arguments[index + 1];
}

function isArgPresent(arguments, keyword, keyletter) {
    return arguments.indexOf('--' + keyword) !== -1 || arguments.indexOf('-' + keyletter) !== -1;
}
