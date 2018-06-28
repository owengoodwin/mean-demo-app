const express = require("express");

const Post = require("../models/post");

const router = express.Router();

router.post("", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: "Post added successfully",
      postId: createdPost._id
    });
  });
});

router.put("/:id", (req, res, next) => {
  Post.updateOne({ _id: req.params.id }, { title: req.body.title, content: req.body.content }).then(result => {
    res.status(200).json({
      message: "post updated successfully",
      post: result
    });
  });
});

router.get("", (req, res, next) => {
  Post.find().then(documents => {
    console.log(documents);
    res.status(200).json({
      message: "posts fetched successfully",
      posts: documents
    });
  });
});

router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "post not found"
      });
    }
  });
});

router.delete("/:id", (req, res, next) => {
  console.log(req.params.id);
  Post.deleteOne({ _id: req.params.id }).then(result => {
    console.log(result);
    res.status(200).json({message: "Post deleted successfully."});
  });
});

module.exports = router;
