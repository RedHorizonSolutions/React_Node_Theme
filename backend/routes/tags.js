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
const Tag = require("../models/tag");
const reqAuth = require("../config/safeRoutes").reqAuth;

// route /admin/tags/

router.post("/all", reqAuth, function (req, res) {
  Tag.find({}, function (err, tags) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, tags: tags });
  });
});

router.post("/one/:id", reqAuth, function (req, res) {
	const id = req.params.id;

  Tag.findOne({ _id: id }, function (err, tag) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, tag: tag });
  });
});

router.post("/add", reqAuth, function (req, res) {
  const { title, color } = req.body;

  if (!title || !color) {
    return res.json({ success: false, msg: "required fields are empty" });
  }

  Tag.find({ title: title }).then((tag) => {
    if (tag.length == 1) {
      return res.json({ success: false, msg: "tag already exists" });
    } else {
      const query = { title: title, color: color };
      Tag.create(query, function (err, cb) {
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
  const { title, color, id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Tag.find({ _id: id }).then((tag) => {
    if (tag.length == 1) {
      const query = { _id: id };
      const dataToSet = {};

      if (title) {
        dataToSet.title = title;
      }
      if (color) {
        dataToSet.color = color;
      }

      const newvalues = { $set: dataToSet };
      Tag.updateOne(query, newvalues, function (err, cb) {
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

  Tag.deleteMany({ _id: id }, function (err, item) {
    if (err) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
