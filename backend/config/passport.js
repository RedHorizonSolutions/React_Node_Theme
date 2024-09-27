/*

=========================================================
* Argon Dashboard PRO React Nodejs - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react-nodejs
* Copyright 2021 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim
* Coded by ProjectData

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./keys');
const apiService = require('crypt-api-v2')

module.exports = function(passport) {
  
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  apiService();
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findById(jwtPayload._doc._id, (err, user) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
};
