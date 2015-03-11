//
//   # Option
//
//       Option a = Some a + None
//
//   The option type encodes the presence and absence of a value. The
//   `Some` constructor represents a value and `None` represents the
//   absence.
//
//   * `ap(s)` - Applicative ap(ply)
//   * `chain(f)` - Monadic flatMap/bind
//   * `concat(s, plus)` - Semigroup concat
//   * `fold(a, b)` - Applies `a` to value if `Some` or defaults to `b`
//   * `orElse(a)` - Default value for `None`
//   * `getOrElse(a)` - Default value for `None`
//   * `map(f)` - Functor map
//
var daggy = require('daggy'),
    mapObject = require('map-object'),
    conditions = require('conditions'),
    math = require('math'),

    combinators = require('fantasy-combinators'),
    constant = combinators.constant,
    identity = combinators.identity,
    
    mixin = function (target, source) {
        mapObject(source, function(_, k) {
            if (!target.prototype.hasOwnProperty(k)) target.prototype[k] = source[k];
            else console.warn("Field %o already exist in prototype!", k);
        });
    },

    error = function (str) {
        return function () {
            throw new Error(str);
        };
    },

    Option = daggy.taggedSum({
        Some: ['x'],
        None: []
    });

// Methods
Option.prototype.fold = function (f, g) {
    return this.cata({
        Some: f,
        None: g
    });
};
Option.of = Option.Some;
Option.prototype.operation = function (operation) {
    return (function (valueO) {
        return this.chain(function (meV) {
            return valueO.map(operation(meV));
        });
    }).bind(this);
};
Option.prototype.orElse = function (x) {
    return this.fold(
        Option.Some,
        constant(x)
    );
};
Option.prototype.getOrElse = function (x) {
    return this.fold(
        identity,
        function () {
            return x;
        }
    );
};
Option.prototype.chain = function (f) {
    return this.fold(
        function (a) {
            return f(a);
        },
        function () {
            return Option.None;
        }
    );
};
Option.prototype.concat = function (x) {
    return this.chain(function (a) {
        return x.map(function (b) {
            return a.concat(b);
        });
    });
};

// Derived
Option.prototype.chainOf = function (f) {
    return this.fold(
        function (a) {
            return f(Option.of(a));
        },
        function () {
            return Option.None;
        }
    );
};
Option.prototype.map = function (f) {
    return this.chain(function (a) {
        return Option.from(f(a));
    });
};
Option.prototype.ap = function (a) {
    return this.chain(function (f) {
        return a.map(f);
    });
};

Option.prototype.sequence = function (p) {
    return this.traverse(identity, p);
};
Option.prototype.traverse = function (f, g) {
    return this.fold(
        function (x) {
            return f(x).map(Option.of);
        },
        function () {
            return g.of(Option.None);
        }
    );
};
Option.from = function (a) {
    return !(typeof a === 'undefined' || a === null) ? Option.of(a) : Option.None;
};
Option.prototype.is = function (x) {
    return this.chain(function (a) {
        return x.chain(function (b) {
            return a === b ? Option.of(a) : Option.None;
        });
    });
};
Option.prototype.isNot = function (x) {
    return this.chain(function (a) {
        return x.fold(
            function (b) {
                return a !== b ? Option.of(a) : Option.None;
            },
            constant(Option.of(a))
        );
    });
};

// Mixin extended functionality into Option prototype
mixin(Option, conditions);
mixin(Option, math);

// Export
if (typeof module != 'undefined')
    module.exports = Option;
