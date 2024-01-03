const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {

  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  const token=bearerToken.slice(7);
  if (!token) {
    return res.status(401).send({ error: "Please authenticate using a valid token" });
  }
  try {
    jwt.verify(token, process.env.USER_JWT_SECRECT, (error, decoded) => {
      if (error) {
        return res.status(200).send({ error });
      }
      if (decoded.user.role === "customer") {
        next();
      }
    });
  } catch (err) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = authenticateUser;
