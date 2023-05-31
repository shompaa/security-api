import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return new Promise((resolve, reject) => {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    jwt.sign(
      payload,
      process.env.SECRET_TOKEN,
      { expiresIn: '1d' },
      (err, token) => {
        if (err) {
          reject("Error generating token");
        } else {
          resolve(token);
        }
      }
    );
  });
};
