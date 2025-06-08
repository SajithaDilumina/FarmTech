const jwt = require("jsonwebtoken");
const { secretKey } = require("../configuration/jwtConfig");

function authenticationToken(req, res, next) {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized: Missing token!" });
  }

  const [bearer, token] = authHeader.split(" ");
  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Unauthorized: Invalid Token Format!" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(403).json({ message: "Forbidden: Invalid token!" });
    }
    req.user = user; // Attach user information to the request
    next();
  });
}

module.exports = { authenticationToken };
