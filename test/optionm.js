var λ = require('fantasy-check/src/adapters/nodeunit'),
    monoid = require('fantasy-check/src/laws/monoid'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    options = require('../fantasy-options'),

    OptionM = options.OptionM,
    
    constant = combinators.constant,
    identity = combinators.identity;

// This is used for the Monoid tests.
Boolean.prototype.concat = function(a) {
    return this && a;
};
Number.prototype.concat = function(a) {
    return this + a;
};

function run(a) {
    return a.x;
}

exports.optionm = {

    // Monoid tests
    'All (Monoid)': monoid.laws(λ)(OptionM, run),
    'leftIdentity (Monoid)': monoid.leftIdentity(λ)(OptionM, run),
    'rightIdentity (Monoid)': monoid.rightIdentity(λ)(OptionM, run),
    'associativity (Monoid)': monoid.associativity(λ)(OptionM, run),
};
