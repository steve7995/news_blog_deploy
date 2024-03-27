const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register the user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = await new User({ username, email, password: hash });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
    // while comparing the  password  during login we must use
    // const isMatched = await bcrypt.compare(enteredPassword,hash)
    //which will return a boolean of true or false.
  } catch (err) {
    //500 means server error
    //400 means client error
    //200 means success
    //300 means redirected
    console.log(err)
    res.status(500).json(err);

  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const ComparePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!ComparePassword) {
      return res.status(401).json("password entered is incorrect!");
    }
    const token = jwt.sign({ id: user._id,username:user.username,email:user.email }, process.env.secret, {
      expiresIn: "3d",
    });
    const info = {
      _id: user._id,
      username: user.username,
      email: user.email,
    };
    res.cookie("jwttoken", token).status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/logout", async (req, res) => {
  try {
    res.clearCookie("jwttoken",{sameSite:"none",secure:true}).status(200).send("User logged out successfully!")
  } catch (err) {
    res.status(500).json(err);
    console.log(err)
  }
});



//keeping the user loggedIn
router.get("/refetch", (req, res) => {
  const token = req.cookies.jwttoken
  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      
      return res.status(404).json(err)
      console.log(err)
    }
    res.status(200).json(data)
  })
})


module.exports = router;
