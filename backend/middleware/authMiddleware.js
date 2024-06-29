// 
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
      return res
        .status(401)
        .send({ message: "Authorization header missing", success: false });
    }

    const token = authorizationHeader.split(" ")[1];
    jwt.verify(token,"JWT_KEY", (err, decoded) => {
      if (err) {
        console.error("JWT verification error:", err);
        if (err.name === "TokenExpiredError") {
          return res.status(401).send({ message: "Token has expired", success: false });
        } else {
          return res.status(401).send({ message: "Token is not valid", success: false });
        }
      } else {
        req.body.userId = decoded.id; // Assuming your JWT payload has an 'id' field
        next();
      }
    });
  } catch (error) {
    console.error("Middleware error:", error);
    res.status(500).send({ message: "Internal server error", success: false });
  }
};
