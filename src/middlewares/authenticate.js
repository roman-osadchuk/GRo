import jwt from "jsonwebtoken";
import User from "../models/User";
import Config from '../../env-sample';

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(" ")[1];

  if (token) {
    jwt.verify(token, Config.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({ errors: { global: "Invalid token" } });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    });
  } else {
    console.log('here');
    res.status(401).json({ errors: { global: "No token" } });
  }
};
