import bcrypt from "bcrypt";
import { User } from "../models/index.model.js";

export const findUsers = async ({ from, limit, search }) => {
  const regex = new RegExp(search, "i");
  const params = search ? { $or: [{ name: regex }, { email: regex }] } : {};

  const [users, total] = await Promise.all([
    User.find(params, "name lastName rut email role")
      .populate("address", "street number district")
      .skip(from)
      .limit(limit),
    User.count(),
  ]);

  return {
    data: users,
    total,
  };
};

export const findUserById = async (id) => {
  try {
    const user = await User.findById(
      id,
      "name lastName rut email role address"
    );
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const findUserByEmail = async (email) => {
  try {
    const regex = new RegExp(email, "i");
    const user = await User.findOne({ email: regex })
      .populate("address");
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const { email, password } = user;
    const existentUser = await User.findOne({ email });
    if (existentUser) {
      throw new Error(`${email} 
            `);
    }

    const newUser = new User(user);
    const salt = bcrypt.genSaltSync();
    newUser.password = bcrypt.hashSync(password, salt);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const editUser = async (id, user) => {
  try {
    const userDB = await User.findById(id);
    if (!userDB) {
      throw new Error("User not found");
    }
    const { password, role, _id, ...params } = user;
    if (userDB.email != params.email) {
      const existentUser = await findUserByEmail(params.email);
      if (existentUser) {
        throw new Error(`${params.email} already exists`);
      }
    }
    const updatedUser = await User.findByIdAndUpdate(id, params, { new: true });
    return updatedUser || userDB;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (id) => {
  try {
    const userDB = await findById(id);
    if (!userDB) {
      throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndUpdate(
      { id },
      { disabled: true, deletedAt: Date.now() },
      { new: true }
    );
    return deletedUser || userDB;
  } catch (error) {
    throw error;
  }
};
