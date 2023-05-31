import {
  createUser,
  findUserById,
  findUsers,
  removeUser,
  editUser,
} from "../services/index.service.js";

export const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;
  const limit = Number(req.query.limit) || 5;
  const search = req.params.search?.toString() || "";
  const { data, total } = await findUsers({ from, limit, search });

  res.status(200).json({
    data,
    total,
  });
};

export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await findUserById(id);
  res.status(200).json(user);
};

export const addUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await editUser(id, req.body);
    res.status(200).json({
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email } = await removeUser(id);
    res.status(204).json({
      message: `${email} deleted successfully`,
    });
  } catch (error) {
    next(error);
  }
};
