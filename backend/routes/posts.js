const express = require("express");
const router = express.Router();

const Post = require("../models/Posts");
const verifyToken = require("../jwt/verifyToken");

//create Post
router.post("/create", async (req, res) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});

//updatePost
router.put("/:id", async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});


//get post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

//deletePost
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ message: "post has been deleted", post: deletePost });
  } catch (error) {
    res.status(500).json(error);
  }
});

//getallPosts
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    const searchFilter = { title: { $regex: query.search, $options: "i" } };
    const allPosts = await Post.find(query.search ? searchFilter : null);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get posts based on user Id

router.get("/posts/:userId", async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.userId });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});


module.exports = router;
