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
const User = require('../models/user');

module.exports = {
  tokensCleanUp: function() {
    const date = new Date();
    const daysToDelete = 1;
    const deletionDate = new Date(date.setDate(date.getDate() - daysToDelete));
    ActiveSession.deleteMany({date: {$lt: deletionDate}}, function(err, item) {
      return;
    });

    User.deleteMany({email: {$ne: 'admin@argon.com'}}, function(err, item) {
      return;
    });
  },
};


