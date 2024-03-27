const express = require("express");
const Comments = require("../models/Comments");
const router = express.Router();
const verifyToken = require('../jwt/verifyToken');
//create comments
router.post("/create", async (req, res) => {
  try {
    const newComment = new Comments(req.body)
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  }
  catch (err) {
    res.status(500).json(err)
  }

})

//update comment based on id
router.put("/:id", async (req, res) => {
  try {
    const updateComment = await Comments.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//delete comment based on id
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedComment);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get comments based on post id
router.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comments.find({ PostId: req.params.postId })
    res.status(200).json(comments)
    // console.log('these are the fetched comments', comments)
  }
  catch (err) {
    res.status(500).json(err)
    console.log(err)
  }
})
module.exports = router;
