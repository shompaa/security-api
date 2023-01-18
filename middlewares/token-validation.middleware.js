import jwt from "jsonwebtoken";

export const JWTValidation = (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    const token = authorization.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        status: 401,
        message: "Unauthorized",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    if( new Date(decoded.exp * 1000) < new Date() ){
      return res.status(401).json({
        status: 401,
        message: "Token expired",
      });
    }

    req.body.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      status: 401,
      message: "Unauthorized",
    });
  }
};
