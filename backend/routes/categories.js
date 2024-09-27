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

const express = require("express");
const router = express.Router();
const config = require("../config/keys");
const Category = require("../models/category");
const reqAuth = require("../config/safeRoutes").reqAuth;

// route /admin/categories/

router.post("/all", reqAuth, function (req, res) {
  Category.find({}, function (err, categories) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, categories: categories });
  });
});

router.post("/one/:id", reqAuth, function (req, res) {
	const id = req.params.id;

  Category.findOne({ _id: id }, function (err, category) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, category: category });
  });
});

router.post("/add", reqAuth, function (req, res) {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.json({ success: false, msg: "required fields are empty" });
  }

  Category.find({ title: title }).then((category) => {
    if (category.length == 1) {
      return res.json({ success: false, msg: "category already exists" });
    } else {
      const query = { title: title, description: description };
      Category.create(query, function (err, cb) {
        if (err) {
          return res.json({
            success: false,
            msg: "There was an error. Please contract the administator",
          });
        }
        return res.json({ success: true });
      });
    }
  });
});

router.post("/edit", reqAuth, function (req, res) {
  const { title, description, id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Category.find({ _id: id }).then((category) => {
    if (category.length == 1) {
      const query = { _id: id };
      const dataToSet = {};

      if (title) {
        dataToSet.title = title;
      }
      if (description) {
        dataToSet.description = description;
      }

      const newvalues = { $set: dataToSet };
      Category.updateOne(query, newvalues, function (err, cb) {
        if (err) {
          // eslint-disable-next-line max-len
          return res.json({
            success: false,
            msg: "There was an error. Please contract the administator",
          });
        }
        return res.json({ success: true });
      });
    } else {
      return res.json({ success: false });
    }
  });
});

router.post("/delete", reqAuth, function (req, res) {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Category.deleteMany({ _id: id }, function (err, item) {
    if (err) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
