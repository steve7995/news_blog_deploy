const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/Users");
const Post = require("../models/Posts");
const Comment = require("../models/Comments");


//getall Users
router.get('/allUsers',  async(req,res)=>{

try {
  const allUsers = await User.find();
  res.status(200).json(allUsers);
} catch (error) {
  res.status(500).json(error)
}

})



//update user
router.put("/update/:id", async (req, res) => {
 try {
  const id = req.params.id;
  if (req.body.password) {
   const salt = bcrypt.genSaltSync(10);
   req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  const newUser = await User.findByIdAndUpdate(
   id,
   { $set: req.body },
   { new: true }
  );

  res.status(200).json(newUser);
 } catch (error) {
  res.status(500).json(error);
 }
});

//delete user
router.delete("/delete/:id", async (req, res) => {
 try {
  const removedUser = await User.findByIdAndDelete(req.params.id);
  await Post.deleteMany({ userId: req.params.id });
  await Comment.deleteMany({ userId: req.params.id });
  res
   .status(200)
   .json({ message: "user has been deleted", deletedUser: removedUser });
 } catch (err) {
  res.status(500).json(err);
 }
});

//get user based on id
router.get("/getUser/:id", async (req, res) => {
 try {
  const myUser = User.findById(req.params.id);
  const { password, ...info } = myUser;
  res.status(200).json(info);
 } catch (err) {
  res.status(500).json(err);
 }
});

module.exports = router;
