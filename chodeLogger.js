module.exports = {
    log: chodeLog,
    logGreen,
    logRed,
}

function chodeLog(message = '', verbose = true, colorByte = '') {
    if (!verbose) {
        return;
    }

    if (colorByte !== '') {
        message = colorByte + message + '\x1b[0m';
    }

    console.log(message);
}

function logGreen(message = '', verbose = true) {
    chodeLog(message, verbose, '\x1b[32m');
}

function logRed(message = '', verbose = true) {
    chodeLog(message, verbose, '\x1b[31m');
}
