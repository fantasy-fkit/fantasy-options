/**
 * Created by laiff on 06.11.14.
 */

var daggy = require('daggy'),

    Option = require('./option');

// Transformer
var optionT = function(M) {

    var OptionT = daggy.tagged('run');

    OptionT.prototype.fold = function(f, g) {
        return this.run.chain(function(o) {
            return M.of(o.fold(f, g));
        });
    };
    OptionT.of = function(x) {
        return OptionT(M.of(Option.Some(x)));
    };
    OptionT.prototype.orElse = function(b) {
        return OptionT(this.run.chain(function(a) {
            return a.fold(
                function(x) {
                    return M.of(a);
                },
                function() {
                    return b.run;
                }
            );
        }));
    };
    OptionT.prototype.getOrElse = function(x) {
        return this.run.chain(function(o) {
            return M.of(o.getOrElse(x));
        });
    };
    OptionT.prototype.chain = function(f) {
        var m = this.run;
        return OptionT(m.chain(function(o) {
            return o.fold(
                function(a) {
                    return f(a).run;
                },
                function() {
                    return M.of(Option.None);
                }
            );
        }));
    };
    OptionT.prototype.map = function(f) {
        return this.chain(function(a) {
            return OptionT.of(f(a));
        });
    };
    OptionT.prototype.ap = function(a) {
        return this.chain(function(f) {
            return a.map(f);
        });
    };
    return OptionT;
};

// Export
if (typeof module != 'undefined')
    module.exports = optionT;
