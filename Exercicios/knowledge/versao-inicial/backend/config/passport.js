const { authSecret } = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy } = require('passport')
const { Strategy, ExtractJwt } = passport

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const Strategy = new Strategy(params, (payload, done) => {
        app.db('users')
            .where({ id: payload.id })
            .first()
            .then(user => done(null, user ? { ...playload } : false))
            .catch(err => done(err, false))
    })

    passport.use(Strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}