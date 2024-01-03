const jwt = require("jsonwebtoken");

const userauth = (req, res, next) => {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  const token = bearerToken.slice(7);
  if (!token) {
    return res
      .status(401)
      .send({ error: "Please authenticate using a valid token" });
  }
  try {
    if (token) {
      const decodedToken = jwt.decode(token);
      if (decodedToken.user.role === "Admin") {
        jwt.verify(token, process.env.ADMIN_JWT_SECRET, (error) => {
          if (error) {
            return res.status(401).send({ error });
          }
          next();
        });
      } else if (decodedToken.user.role === "customer") {
        jwt.verify(token, process.env.USER_JWT_SECRECT, (error) => {
          if (error) {
            return res.status(401).send({ error });
          }
          next();
        });
      }
    }
  } catch (err) {
    res.status(401).send({ error: "Authentication failed" });
  }
};

module.exports = userauth;
