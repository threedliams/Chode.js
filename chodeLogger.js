module.exports = {
    log: chodeLog,

    logGreen: function(message = '', verbose = true) {
        chodeLog(message, verbose, '\x1b[32m');
    },

    logRed: function(message = '', verbose = true) {
        chodeLog(message, verbose, '\x1b[31m');
    },
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
