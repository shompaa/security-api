import bcrypt from "bcrypt";
import { generateToken } from "../utils/index.js";
import { findUserByEmail } from "./index.service.js";

export const loginService = async (params) => {
  try {
    const { email, password } = params;
    const user = await findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      throw new Error("Invalid email or password");
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
