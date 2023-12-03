require("dotenv").config();
const jwt = require("jsonwebtoken");

class JwtService {
  static sign(payload, expiry = "2d", secret = process.env.JWT_SECRET || "secret") {
    return jwt.sign(payload, secret, { expiresIn: expiry });
  }
  static verify(token, secret = process.env.JWT_SECRET || "secret") {
    return jwt.verify(token, secret);
  }
}

module.exports = JwtService;