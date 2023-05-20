const jwt = require('jsonwebtoken');
require("dotenv").config();

let result = {
  status : null,
  message : null,
  data : null,
  token : null
};

const AuthMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token){
    result.message = "Access Denied";
    result.status = false;
    return res.status(401).send(result);
  } 

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    result.message = "Invalid Token";
    result.status = false;
    res.status(400).send(result);
  }
}

module.exports = AuthMiddleware;
