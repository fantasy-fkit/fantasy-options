var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
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
    
    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(OptionM, run),
    'Identity (Applicative)': applicative.identity(λ)(OptionM, run),
    'Composition (Applicative)': applicative.composition(λ)(OptionM, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(OptionM, run),
    'Interchange (Applicative)': applicative.interchange(λ)(OptionM, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(OptionM.of, run),
    'Identity (Functor)': functor.identity(λ)(OptionM.of, run),
    'Composition (Functor)': functor.composition(λ)(OptionM.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(OptionM, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(OptionM, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(OptionM, run),
    'Associativity (Monad)': monad.associativity(λ)(OptionM, run),

    // Monoid tests
    'All (Monoid)': monoid.laws(λ)(OptionM, run),
    'leftIdentity (Monoid)': monoid.leftIdentity(λ)(OptionM, run),
    'rightIdentity (Monoid)': monoid.rightIdentity(λ)(OptionM, run),
    'associativity (Monoid)': monoid.associativity(λ)(OptionM, run),
};
