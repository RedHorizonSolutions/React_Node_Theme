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

dbPasswordDev ='mongodb://localhost/boilerplate';

// for PRODUCTION
// const MONGO_USERNAME = 'sammy';
// const MONGO_PASSWORD = 'your_password';
// const MONGO_HOSTNAME = '127.0.0.1';
// const MONGO_PORT = '27017';
// const MONGO_DB = 'sharkinfo';

// const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;

module.exports = {
  mongoURI: dbPasswordDev,
  secret: 'yourSecretKey',
};
