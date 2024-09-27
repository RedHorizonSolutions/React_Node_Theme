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

const ActiveSession = require('../models/activeSession');

const reqAuth = (req, res, next) => {
  const token = String(req.headers.authorization);
  ActiveSession.find({token: token}, function(err, session) {
    if (session.length == 1) {
      return next();
    } else {
      return res.json({success: false, msg: 'User is not logged on'});
    }
  });
};

module.exports = {
  reqAuth: reqAuth,
};
