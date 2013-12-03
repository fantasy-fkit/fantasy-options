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
OptionM.prototype.fold = function(f, g) {
    return this.x.fold(f, g);
};
OptionM.prototype.chain = function(f) {
    return this.fold(
        function(a) {
            return f(a);
        },
        OptionM.empty
    );
};
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

// Derived
OptionM.prototype.ap = function(a) {
    return this.chain(function(f) {
        return a.map(f);
    });
};
OptionM.prototype.map = function(f) {
    return this.chain(function(a) {
        return OptionM.of(f(a));
    });
};

// Export
if (typeof module != 'undefined')
    module.exports = OptionM;