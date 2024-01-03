const jwt = require("jsonwebtoken");

const adminAuthentication = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  const token = bearerToken.slice(7);
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    jwt.verify(token, process.env.ADMIN_JWT_SECRET, (error, decoded) => {
      if (error) {
        return res.status(404).send({ error });
      }
      if (decoded.user.role === "Admin") {
        next();
      }
    });
  } catch (err) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = adminAuthentication;
