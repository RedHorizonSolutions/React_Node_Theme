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
const Task = require("../models/task");
const reqAuth = require("../config/safeRoutes").reqAuth;

// route /admin/tasks/

router.post("/all", reqAuth, function (req, res) {
  Task.find({}, function (err, tasks) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, tasks: tasks });
  });
});

router.post("/user", reqAuth, function (req, res) {
  const {userId} = req.body;

  Task.find({ userId: userId }, function (err, tasks) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, tasks: tasks });
  });
});

router.post("/one/:id", reqAuth, function (req, res) {
  const id = req.params.id;

  Task.findOne({ _id: id }, function (err, task) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, task: task });
  });
});

router.post("/add", reqAuth, function (req, res) {
  const { userId, title, description, color, startDate, endDate } = req.body;

  if (!userId || !title || !description || !color || !startDate || !endDate) {
    return res.json({ success: false, msg: "required fields are empty" });
  }

  const query = {
    userId: userId,
    title: title,
    description: description,
    color: color,
    startDate: startDate,
    endDate: endDate,
  };

  Task.create(query, function (err, cb) {
    if (err) {
      return res.json({
        success: false,
        msg: "There was an error. Please contract the administator",
      });
    }
    return res.json({ success: true, task: cb });
  });
});

router.post("/edit", reqAuth, function (req, res) {
  const { id, userId, title, description, color, startDate, endDate, status } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Task.find({ _id: id }).then((tag) => {
    if (tag.length == 1) {
      const query = { _id: id };
      const dataToSet = {};

      if (userId) {
        dataToSet.userId = userId;
      }
      if (title) {
        dataToSet.title = title;
      }
			if (description) {
        dataToSet.description = description;
      }
			if (color) {
        dataToSet.color = color;
      }
			if (startDate) {
        dataToSet.startDate = startDate;
      }
			if (endDate) {
        dataToSet.endDate = endDate;
      }
			if (status) {
        dataToSet.status = status;
      }

      const newvalues = { $set: dataToSet };
      Task.updateOne(query, newvalues, function (err, cb) {
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
      return res.json({ success: false, msg: "Task doesn't exists" });
    }
  });
});

router.post("/delete", reqAuth, function (req, res) {
  const { id } = req.body;

  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Task.deleteMany({ _id: id }, function (err, item) {
    if (err) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
