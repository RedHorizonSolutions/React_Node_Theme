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

const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;
