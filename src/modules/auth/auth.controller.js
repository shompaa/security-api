import { loginService } from "./auth.service.js";

export const login = async (req, res, next) => {
  try {
    const resp = await loginService(req?.body);
    res.status(200).json({
      data: "User logged in successfully",
    });
  } catch (e) {
    next(e);
    return;
  }
};
