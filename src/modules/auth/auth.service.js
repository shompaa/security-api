import bcrypt from "bcrypt";
import createError from "http-errors";
import { generateToken } from "../../utils/index.js";
import { findUserByEmail } from "../user/user.service.js";

export const loginService = async (params) => {
  try {
    const { email, password } = params;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new createError(404, "User not found");
    }
    const validPassword = bcrypt.compareSync(password, user.password);

    if (!validPassword) {
      throw new createError(400, "Invalid email or password");
    }
    const {
      password: _,
      deletedAt,
      createdAt,
      updatedAt,
      ...userWithoutPassword
    } = user.toObject();
    const token = await generateToken(user);
    return { user: userWithoutPassword, token };
  } catch (error) {
    throw error;
  }
};
