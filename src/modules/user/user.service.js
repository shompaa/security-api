import bcrypt from "bcrypt";
import createHttpError from "http-errors";
import { User } from "./user.model.js";

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
    const user = await User.findOne({ email: email }).populate("address");
    if (!user) {
      throw new createHttpError(404, "User not found");
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
      throw new Error(`${email} already exists`);
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
    const { password, role, _id, ...params } = user;

    const existingUser = await User.findById(id);
    if (!existingUser) {
      throw new Error("User not found");
    }

    if (params.email && existingUser.email !== params.email) {
      const emailExists = await User.findOne({ email: params.email });
      if (emailExists) {
        throw new Error("One of the fields already exists, it cannot be added");
      }
      existingUser.email = params.email;
    }

    if (params.rut && existingUser.rut !== params.rut) {
      const rutExists = await User.findOne({ rut: params.rut });
      if (rutExists) {
        throw new Error("One of the fields already exists, it cannot be added");
      }
      existingUser.rut = params.rut;
    }

    existingUser.name = params.name || existingUser.name;
    existingUser.lastName = params.lastName || existingUser.lastName;

    const updatedUser = await existingUser.save();
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const removeUser = async (id) => {
  try {
    const userDB = await User.findById(id);
    if (!userDB) {
      throw new Error("User not found");
    }
    const deletedUser = await User.findByIdAndUpdate(
      id,
      { disabled: true, deletedAt: Date.now() },
      { new: true }
    );
    return deletedUser || userDB;
  } catch (error) {
    throw error;
  }
};
