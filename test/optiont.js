/**
 * Created by laiff on 06.11.14.
 */
var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),

    helpers = require('fantasy-helpers'),
    combinators = require('fantasy-combinators'),
    Identity = require('fantasy-identities'),
    options = require('../fantasy-options'),

    Option = options.Option,
    OptionT = options.OptionT;

function run(a) {
    return a.run.x;
}

exports.optionT = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(OptionT(Identity), run),
    'Identity (Applicative)': applicative.identity(λ)(OptionT(Identity), run),
    'Composition (Applicative)': applicative.composition(λ)(OptionT(Identity), run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(OptionT(Identity), run),
    'Interchange (Applicative)': applicative.interchange(λ)(OptionT(Identity), run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(OptionT(Identity).of, run),
    'Identity (Functor)': functor.identity(λ)(OptionT(Identity).of, run),
    'Composition (Functor)': functor.composition(λ)(OptionT(Identity).of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(OptionT(Identity), run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(OptionT(Identity), run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(OptionT(Identity), run),
    'Associativity (Monad)': monad.associativity(λ)(OptionT(Identity), run)
};