import {
  createOwner,
  deleteOwner,
  findCarsByOwner,
  findOwnerById,
  findOwnersByAddress,
  updateOwner,
} from "../services/index.service.js";

export const getCarsByOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cars = await findCarsByOwner(id);
    res.json({
      status: 200,
      data: cars,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const getOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await findOwnerById(id);
    res.json({
      status: 200,
      data: owner,
    });
  } catch (e) {
    next(e);
    throw e;
  }
};

export const addOwner = async (req, res, next) => {
  try {
    const owner = await createOwner(req.body);
    return res.json({
      status: 200,
      message: "Owner created successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const editOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await updateOwner(id, req.body);
    return res.json({
      status: 200,
      message: "Owner updated successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
    return;
  }
};

export const removeOwner = async (req, res, next) => {
  try {
    const { id } = req.params;
    const owner = await deleteOwner(id);
    return res.json({
      status: 200,
      message: "Owner deleted successfully",
      data: owner,
    });
  } catch (e) {
    next(e);
    return;
  }
};
