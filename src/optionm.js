var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),
    constant = combinators.constant,

    Option = require('./option'),
    OptionM = daggy.tagged('x');

// Methods
OptionM.of = function(x) {
    return OptionM(Option.Some(x));
};
OptionM.empty = function() {
    return OptionM(Option.None);
};
OptionM.prototype.extract = function() {
    return this.x;
};

// Derived
OptionM.prototype.concat = function(x) {
    return this.x.cata({
        Some: function(a) {
            return x.x.cata({
                Some: function(b) {
                    return OptionM.of(a.concat(b));
                },
                None: function() {
                    return OptionM.of(a);
                }
            });
        },
        None: function() {
            return x.x.cata({
                Some: function(b) {
                    return OptionM.of(b);
                },
                None: constant(OptionM(Option.None))
            });
        }
    });
};

// Export
if (typeof module != 'undefined')
    module.exports = OptionM;