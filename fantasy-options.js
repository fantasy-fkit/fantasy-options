var Option = require('./src/option'),
    OptionM = require('./src/optionm');

if (typeof module != 'undefined')
    module.exports = {
        Option: Option,
        OptionM: OptionM
    };
