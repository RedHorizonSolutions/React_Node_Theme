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
const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const compression = require('compression');
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
const db = require('./config/keys').mongoURI;
const CronJob = require('cron').CronJob;
const crons = require('./config/crons');

require('dotenv').config();

// Instantiate express
const app = express();
app.use(compression());

// Passport Config
require('./config/passport')(passport);

// DB Config

// Connect to MongoDB
mongoose
    .connect(
        db, {useNewUrlParser: true,
          useFindAndModify: false,
          useUnifiedTopology: true,
          useCreateIndex: true},
    )
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => console.log(err));

app.use(cors());

// this is for HTTPS server
// app.use(requireHTTPS);


// Express body parser
app.use('/public', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// REACT BUILD for production
if (process.env.NODE_ENV === 'PROD') {
  app.use(express.static(path.join(__dirname, 'build')));
  app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}


// Initialize routes middleware
app.use('/api/users', require('./routes/users'));
app.use('/api/tasks', require('./routes/task'));
app.use('/api/tags', require('./routes/tags'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/posts', require('./routes/posts'));

// run at 3:10 AM -> delete old tokens
const tokensCleanUp = new CronJob('10 3 * * *', function() {
  crons.tokensCleanUp();
});
tokensCleanUp.start();

const PORT = process.env.PORT;
// this is for HTTPS server
// https.createServer({
//   key: fs.readFileSync(process.env.SSLKEY),
//   cert: fs.readFileSync(process.env.SSLCERT),
// }, app)
//     .listen(PORT, function() {
//       console.log('App listening on port ' + PORT + '! Go to https://localhost:' + PORT + '/');
//     });

http.createServer(app)
    .listen(PORT, function() {
      console.log('App listening on port ' + PORT + '! Go to http://localhost:' + PORT + '/');
    });

    
// this is for HTTPS server

/**
 * @param {int} req req.
 * @param {int} res res.
 * @param {int} next next.
 * @return {void} none.
 */
// function requireHTTPS(req, res, next) {
//   if (!req.secure) {
//     return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

// app.enable('trust proxy');
// app.use(function(req, res, next) {
//   if (req.secure) {
//     return next();
//   }
//   res.redirect('https://' + req.headers.host + req.url);
// });
