var Option = require('./src/option'),
    OptionT = require('./src/optiont'),
    OptionM = require('./src/optionm');

if (typeof module != 'undefined')
    module.exports = {
        Option: Option,
        OptionT: OptionT,
        OptionM: OptionM
    };
