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
const Post = require("../models/post");
const reqAuth = require("../config/safeRoutes").reqAuth;

// route /admin/posts/

router.post("/all", reqAuth, function (req, res) {
  Post.find({}, function (err, posts) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, posts: posts });
  });
});

router.post("/publshed", reqAuth, function (req, res) {
  Post.find({ publishedAt: { $lte: new Date() } }, function (err, posts) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, posts: posts });
  });
});

router.post("/categories", reqAuth, function (req, res) {
  const { category } = req.body;

  Post.find({ categories: category }, function (err, posts) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, posts: posts });
  });
});


router.post("/one/:id", reqAuth, function (req, res) {
  const id = req.params.id;

  Post.findOne({ _id: id }, function (err, post) {
    if (err) {
      return res.json({ success: false });
    }

    return res.json({ success: true, post: post });
  });
});

router.post("/add", reqAuth, function (req, res) {
  const { title, content, categories, tags, authorName, publishedAt } =
    req.body;

  if (
    !title ||
    !content ||
    !categories ||
    !tags ||
    !authorName ||
    !publishedAt
  ) {
    return res.json({ success: false, msg: "required fields are empty" });
  }

  Post.find({ title: title }).then((post) => {
    if (post.length == 1) {
      return res.json({ success: false, msg: "post already exists" });
    } else {
      const query = {
        title: title,
        content: content,
        categories: categories,
        tags: tags,
        authorName: authorName,
        publishedAt: publishedAt,
      };
      Post.create(query, function (err, cb) {
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
  const { id, title, content, categories, tags, authorName, publishedAt } =
    req.body;
  if (!id) {
    return res.json({ success: false, msg: "Required fields are empty" });
  }

  Post.find({ _id: id }).then((post) => {
    if (post.length == 1) {
      const query = { _id: id };
      const dataToSet = {};

      if (title) {
        dataToSet.title = title;
      }
      if (content) {
        dataToSet.content = content;
      }
      if (categories) {
        dataToSet.categories = categories;
      }
      if (tags) {
        dataToSet.tags = tags;
      }
      if (authorName) {
        dataToSet.authorName = authorName;
      }
      if (publishedAt) {
        dataToSet.publishedAt = publishedAt;
      }

      dataToSet.lastUpdateDate = new Date();

      const newvalues = { $set: dataToSet };
      Post.updateOne(query, newvalues, function (err, cb) {
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

  Post.deleteMany({ _id: id }, function (err, item) {
    if (err) {
      return res.json({ success: false });
    }
    return res.json({ success: true });
  });
});

module.exports = router;
