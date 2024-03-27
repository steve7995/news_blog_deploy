const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json("Not authorized");
  }
  jwt.verify(token, process.env.secret, async (err, data) => {
    if (err) {
      return res.status(403).json("token is not valid");
    }
    req.userId = data._id;
    next();
  });
};

module.exports = verifyToken;
