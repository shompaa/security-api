import { loginService } from "../services/index.service.js";

export const login = async (req, res, next) => {
  try {
    const resp = await loginService(req?.body);
    res.status(200).json({
      message: "User logged in successfully",
      data: resp,
    });
  } catch (e) {
    next(e);
    return;
  }
};
